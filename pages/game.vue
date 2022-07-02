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
        <DialogBox :z="0" />
        <Hint :z="0" />
        <ShopBox :z="1" />
        <MarketPriceBox :z="1" />
        <NewspaperBox :z="2"  /> 
        <PortBox :z="3" />
    </main>
</template>

<style>

</style>