<script setup lang="ts">
const player = usePlayer()
const overlayState = useOverlayState();

watchEffect(async () => {
    if (overlayState.value.inventoryBox.isPulsing) {
        await wait(info.pulseWait);
        overlayState.value.inventoryBox.isPulsing = false;
    }
});
</script>

<template>
    <div 
        class="inventory-box content overlay-element small" 
        :class="{ 'is-pulsing': overlayState.inventoryBox.isPulsing }"
        v-show="overlayState.inventoryBox.isShowing"
    >
        <h2 class="allcaps">
            Spice Rack
            <span class="text small">🌶️</span>
        </h2>
        <hr style="--accent: white;">
        <div>
            <div class="prices-container">
                <template v-for="(amount, spice) in player.inventory">
                    <h3 v-if="amount > 0" class="price">
                        <span class="spice-name">{{ spice }}:</span> 
                        <span class="price-amount">
                            {{ amount.toLocaleString() }}
                        </span>
                    </h3>
                </template>
            </div>
            <h3 v-if="Object.keys(player.inventory).length === 0">
                You have no spices now, buy or import some.
            </h3>
        </div>
    </div>
</template>

<style scoped>
.inventory-box { 
    color:white;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.prices-container {
    text-align: left;
}

h3.price {
    display: flex;
}

.spice-name {
    margin-right: 1.5rem;
}

.price-amount {
    margin-left: auto;
}
</style>