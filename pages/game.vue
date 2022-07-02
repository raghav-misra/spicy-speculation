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
        <DialogBox style="--z: 1;" />
        <Hint style="--z: 1;" />
        <ShopBox style="--z: 2;" />
        <MarketPriceBox style="--z: 2;" />
        <NewspaperBox style="--z: 3;"  /> 
        <PortBox style="--z: 3;" />
    </main>
</template>

<style>

</style>