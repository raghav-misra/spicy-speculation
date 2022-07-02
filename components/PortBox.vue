<script setup lang="ts">
const portSettings = usePortDisplayState();
const playerState = usePlayer();

function closeByOverlayClick(e: MouseEvent) {
    if ((e.target as HTMLElement).classList.contains("port-container")) {
        portSettings.value.isShowing = false;
    }
}

const importingPortsCount = computed(
    () => playerState.value.ports.filter(p => p.direction === "import").length
);
const exportingPortsCount = computed(
    () => playerState.value.ports.filter(p => p.direction === "export").length
);

const nextPortCost = computed(() => 
    10000 * Math.pow(5, playerState.value.ports.length - 2)
);

watchEffect(()=>{
    if(portSettings.value.isShowing){
        audio.openShop.play();
    }else{
        audio.close.play();
    }
})

async function buyPort(type: "import" | "export") {
    const portCount = type === "export" ? exportingPortsCount : importingPortsCount;

    if (portCount.value === 3) {
        portSettings.value.message = `You've reached the limit on ${type === "export" ? "outbound" :  "inbound"} ports!`;
    } else if (playerState.value.money >= nextPortCost.value) {
        playerState.value.money -= nextPortCost.value;

        playerState.value.ports.push({
            direction: type,
            ship: {
                direction: type,
                type: "small",
                shopItems: [],
                name: "Battle Bus"
            }
        });

        portSettings.value.message = `You'll have a new port tomorrow!`;
        audio.purchase.play();
    } else {
        portSettings.value.message = `Ah shucks, you're broke bozo!`;
    }

    await wait(3000);
        portSettings.value.message = null;
}
</script>

<template>
    <div class="overlay port-container" v-if="portSettings.isShowing" @click="closeByOverlayClick">
        <div class="overlay-element port content white">
            <header>
                <h1 class="allcaps text big">{{ info.island }} docks</h1>
                <button 
                    style="--accent: var(--red);"
                    class="text small"
                    @click="portSettings.isShowing = false;"
                >
                    close
                </button>
            </header>
            <hr style="--accent: white;">
            <div class="content">
                <h1 class="center">
                    Your docks can have two types of ports:<br>
                    <div class="text">
                        ports for <i>importing</i> and for
                        <i>exporting</i> spices.
                    </div>
                </h1>

                <h2 class="center">
                    A new port will cost you
                    <span style="color: var(--green);">${{ nextPortCost }}</span>!
                </h2>

                <hr style="--accent: white;">

                <div class="description-container">
                    <div class="port-type">
                        <p class="text">
                            <span class="underline">Exporting</span>
                        </p>
                        <br>
                        <h3>Ship your spices daily at market price for a profit (hopefully)!</h3>
                        <br>
                        <p class="text small">
                            You have {{ exportingPortsCount }}/3 outbound ports!
                        </p>
                        <br>

                        <button 
                            class="text small" 
                            style="--accent: var(--green);"
                            @click="buyPort('export')"    
                        >
                            Buy a outbound port!
                        </button>
                    </div>

                    <div class="port-type">
                        <p>
                            <span class="underline text">Importing</span>
                        </p>
                        <br>
                        <h3>
                            A foreign trade ship visits your island daily to sell goods.
                            <br>
                            Two traders roam your island hub.
                        </h3>
                        <br>
                        <p class="text small">
                            You have {{ importingPortsCount }}/3 inbound ports!
                        </p>
                        <br>

                        <button 
                            class="text small" 
                            style="--accent: var(--blue);"
                            @click="buyPort('import')"    
                        >
                            Buy a inbound port!
                        </button>
                    </div>
                </div>

                <hr style="--accent: white;">
                <p class="text center">
                    "{{ portSettings.message || "Can I get a Port on the docks, please?" }}"
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

.description-container {
    display: flex;
    padding-bottom: 0.5rem;
}

.description-container .port-type {
    flex: 1;
}

.port-type:first-of-type h3 {
    margin-right: 2rem;
    height: 60px;
}
.port-type:last-of-type h3 {
    margin-left: 2rem;
    height: 60px;
}

.description-container .port-type:last-of-type {
    margin-left: 2rem;
    text-align: right;
}

header {
    display: flex;
    align-items: center;
}

header h1 {
    flex: 1;
}
</style>