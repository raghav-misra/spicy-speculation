<script setup lang="ts">
const game = usePhaser();
initMarket();

game.value.scene.start("Hub");
</script>

<template>
    <main class="overlay" style="pointer-events: none;">
        <InteractionBox />
        <MarketPrices/>
    </main>
</template>

<style>

</style>