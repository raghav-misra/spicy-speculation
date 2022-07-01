<script setup lang="ts">
try {
    const game = usePhaser();
    initMarket();
    game.value.scene.start("Hub");
} catch (error) {
    location.href = "/";
}
</script>

<template>
    <main class="overlay" style="pointer-events: none;">
        <DialogBox />
        <StoreBox />
        <MarketPrices/>
    </main>
</template>

<style>

</style>