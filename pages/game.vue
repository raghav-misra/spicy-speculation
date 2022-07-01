<script setup lang="ts">
const router = useRouter();

try {
    const game = usePhaser();
    initMarket();
    game.value.scene.start("Hub");
} catch (error) {
    location.href = "/";
}

await showStore({
    title: "Fortnite Item Shop",
    items: [
        {
            name: "Renegade Raider",
            description: "Oh what a rare skin, only been in Fortnite once, get it in Spice Race",
            displayPrice: "$100",
            responseType: "RENEGADE"
        },
        {
            name: "Renegade Raider",
            description: "Oh what a rare skin, only been in Fortnite once, get it in Spice Race",
            displayPrice: "$100",
            responseType: "RENEGADE"
        },
    ]
}, (item) => {
    console.log(item)
});
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