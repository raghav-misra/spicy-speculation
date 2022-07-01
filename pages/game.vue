<script setup lang="ts">
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
            name: "Renegade Raider",
            description: "Oh what a rare skin, only been in Fortnite once, get it in Spice Race!!!!",
            displayPrice: "$100",
            id: "litty skin"
        },{
            name: "Renegade Raider",
            description: "Oh what a rare skin, only been in Fortnite once, get it in Spice Race!!!!",
            displayPrice: "$100",
            id: "litty skin"
        },{
            name: "Renegade Raider",
            description: "Oh what a rare skin, only been in Fortnite once, get it in Spice Race!!!!",
            displayPrice: "$100",
            id: "litty skin"
        },{
            name: "Syrup",
            description: "Yummy syrup!!! Drink up.",
            displayPrice: "$100",
            id: "yummy syrup"
        },{
            name: "Syrup",
            description: "Yummy syrup!!! Drink up.",
            displayPrice: "$100",
            id: "yummy syrup"
        },{
            name: "Syrup",
            description: "Yummy syrup!!! Drink up.",
            displayPrice: "$100",
            id: "yummy syrup"
        },{
            name: "Syrup",
            description: "Yummy syrup!!! Drink up.",
            displayPrice: "$100",
            id: "yummy syrup"
        },{
            name: "Syrup",
            description: "Yummy syrup!!! Drink up.",
            displayPrice: "$100",
            id: "yummy syrup"
        },{
            name: "Syrup",
            description: "Yummy syrup!!! Drink up.",
            displayPrice: "$100",
            id: "yummy syrup"
        },{
            name: "Syrup",
            description: "Yummy syrup!!! Drink up.",
            displayPrice: "$100",
            id: "yummy syrup"
        },
        {
            name: "Renegade Raider",
            description: "Oh what a rare skin, only been in Fortnite once, get it in Spice Race!!!!",
            displayPrice: "$100",
            id: "litty skin"
        },
    ]
}, (item) => `Thanks for buying the ${item.id} big man.`);
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