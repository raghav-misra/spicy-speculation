<script setup lang="ts">
const player = usePlayer()
const overlayState = useOverlayState();

watchEffect(async () => {
    if (overlayState.value.moneyBox.isPulsing) {
        await wait(info.pulseWait);
        overlayState.value.moneyBox.isPulsing = false;
    }
});
</script>

<template>
    <div 
        class="money-box overlay-element small"
        :class="{ 'is-pulsing': overlayState.moneyBox.isPulsing }"
        v-show="overlayState.moneyBox.isShowing"
    >
        <h2 class="allcaps">
            Money: ${{ player.money.toLocaleString() }}
            <span class="text small">💰</span>
        </h2>
    </div>
</template>

<style scoped>
.money-box {
    color: white;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
</style>