<script setup lang="ts">
const router = useRouter();

try {
    const game = usePhaser();
    initMarket();
    game.value.scene.start("Hub");
} catch (error) {
    location.href = "/";
}

showStore({
    title: "Big Shaq's Item Shop",
    items: [
        {
            name: "Syrup",
            description: "Yummy syrup!!! Drink up.",
            displayPrice: "$100",
            responseType: "yummy syrup"
        },
        {
            name: "Renegade Raider",
            description: "Oh what a rare skin, only been in Fortnite once, get it in Spice Race!!!!",
            displayPrice: "$100",
            responseType: "litty skin"
        },
    ]
}, (item) => `Thanks for buying the ${item} big man.`);
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