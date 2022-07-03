<script setup lang="ts">
const exportSettings = useExportDisplayState();
const playerState = usePlayer();
const market = useMarket();
const lockPlayer = useMovementLocked()

const canExport = computed(() => Object.keys(playerState.value.inventory).length > 0);

const exportAmounts = ref<[string, number][]>([
    ["Pepper", 1]
]);

function closeByOverlayClick(e: MouseEvent) {
    if ((e.target as HTMLElement).classList.contains("port-container")) {
        exportSettings.value.isShowing = false;
        market.value.isEnabled = true;
    }
}

watchEffect(()=>{
    if(exportSettings.value.isShowing){
        audio.openShop.play()
    }else{
        audio.close.play()
        lockPlayer.value = false
    }
})

async function startExport() {
    // Determine the maximum # of spices the ship can hold:
    let max = exportSettings.value.ship.type === "med" ? 500 : 100;
    let sum = 0;

    // Consolidate the nested array into an object of spices:
    const finalExports: Record<string, number> = {};
    let moneyEarned = 0;

    exportAmounts.value.forEach(([spice, amount]) => {
        finalExports[spice] = finalExports[spice] || 0;
        finalExports[spice] += amount;
        sum += amount;
    });

    // Make sure ship isn't overcapacity:
    if (sum > max) {
        exportSettings.value.message = `
            Your ship isn't built for that much spice!
            (You tried to load ${sum} spices,
            but ${exportSettings.value.ship.name} can only carry ${max}).`;
        await wait(5000);
        exportSettings.value.message = null;
        return;
    }

    // Make sure that each spice is within capacity, and total its profit.
    for (const spice in finalExports) {
        const amount = finalExports[spice];

        if (amount > playerState.value.inventory[spice] || amount <= 0) {
            exportSettings.value.message = `
                You don't have that much ${spice} to export! 
                (You have ${playerState.value.inventory[spice]} ${spice} in total,
                but tried to export ${amount}).`;
            await wait(5000);
            exportSettings.value.message = null;
            return;
        }

        moneyEarned += amount * market.value.prices.find(p => p.name === spice).price;
    }

    playerState.value.money += moneyEarned;

    for (const spice in finalExports) {
        const amount = finalExports[spice];
        playerState.value.inventory[spice] -= amount;
    }

    // Turn off display UI:
    exportSettings.value.isShowing = false;
    exportSettings.value.port.shipObject.sail("export");
    market.value.isEnabled = true;
    lockPlayer.value = false;

    audio.purchase.play()

    // Show money earned:
    showConversation("Atticus of the Shipyard", [
        `Congratulations on a fine expedition! You have earned $${moneyEarned.toLocaleString()}!`
    ]);
}
</script>

<template>
    <div class="overlay port-container" v-if="exportSettings.isShowing" @click="closeByOverlayClick">
        <div class="overlay-element port content white">
            <header>
                <h1 class="allcaps text big">Ship of {{ exportSettings.ship.name }}</h1>
                <button 
                    style="--accent: var(--red);"
                    class="text small"
                    @click="exportSettings.isShowing = false; market.isEnabled = true;"
                >
                    close
                </button>
            </header>
            <hr style="--accent: white;">
            <div class="content">
                <template v-if="canExport">
                    <p class="text" v-if="exportSettings.message">
                        {{ exportSettings.message }}
                    </p>
                    <p class="text" v-else>
                        {{ exportSettings.ship.name }} is a 
                        {{ exportSettings.ship.type === "med" ? "medium": "small" }}-sized ship,
                        so it can carry a maximum of
                        <span class="underline">{{ exportSettings.ship.type === "med" ? 500 : 100 }}</span> 
                        spices per export.
                    </p>
                <hr style="--accent: white;">
                    <p class="text">Choose spices to export:</p>
                    <div 
                        class="export-group" style="--accent: white;"
                        v-for="(spiceAmount, i) of exportAmounts"
                    >
                        <select class="text" v-model="spiceAmount[0]">
                            <option
                                v-for="name in Object.keys(playerState.inventory)"
                                :value="name"
                            >
                                {{ name }}:
                            </option>
                        </select>

                        <input 
                            type="number" 
                            class="text"
                            v-model.number="spiceAmount[1]" 
                            min="1"
                        />

                        <button 
                            class="text" 
                            style="--accent: var(--red)"
                            @click="exportAmounts.splice(i, 1);"
                        >
                            X
                        </button>

                        <p 
                            class="text" 
                            style="color: var(--green)">
                            +${{ spiceAmount[1] * market.prices.find(p => p.name === spiceAmount[0]).price }}
                        </p>
                    </div>

                    <hr style="--accent: white; margin-top: 0.5rem;">
                    <br>
                    <div>
                        <button
                            class="text" 
                            style="--accent: var(--blue)"
                            @click="exportAmounts.push(['Pepper', 1])"
                        >
                            Add spice
                        </button>

                        <button
                            class="text" 
                            style="--accent: var(--green)"
                            @click="startExport"
                        >
                            Send export
                        </button>
                    </div>
                </template>
                <p v-else class="text">
                    You have no spices to export, buy or import some first!
                </p>
            </div>
        </div>
    </div>
</template>

<style scoped>
button.overlay-element {
    position: fixed;
    top: 1.5rem;
    left: 1.5rem;
}

button.overlay-element h1 {
    position: relative;
    bottom: 4px;
}

.port-container {
    pointer-events: all;
    background: rgba(0, 0, 0, 0.45);
    display: flex;
    justify-content: center;
    align-items: center;
}

.port {
    width: min(max(60vw, 500px), calc(100%));
}

.export-group {
    display: flex;
    align-items: center;
}

button, input, select {
    margin-right: 1rem;
}

header {
    display: flex;
    align-items: center;
}

header h1 {
    flex: 1;
}
</style>