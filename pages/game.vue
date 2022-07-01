<script setup lang="ts">
const router = useRouter();

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
        <StoreDisplay />
        <MarketPrices/>
    </main>
</template>

<style>

</style>