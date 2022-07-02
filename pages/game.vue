<script setup lang="ts">
import ImportBox from '~~/components/ImportBox.vue';
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
        <HintBox style="--z: 1;" />
        <ShopBox style="--z: 2;" />
        <MarketPriceBox style="--z: 2;" />
        <NewspaperBox style="--z: 3;"  /> 
        <PortBox style="--z: 3;" />
        <ImportBox style="--z: 3;" />
        <ExportBox style="--z: 3;" />
    </main>
</template>

<style>

</style>