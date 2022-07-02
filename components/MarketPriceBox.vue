<template>
    <div class="market-price-box content overlay-element small">
        <h2 class="allcaps">Spice Market</h2>
        <hr style="--accent: white;">
        <div>
            <h3 v-for="spice in market.prices">{{spice.name}}: ${{spice.price}}</h3>
        </div>
    </div>
</template>

<script setup lang="ts">
const market = useMarket()
</script>

<style scoped>
.market-price-box { 
    color:white;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
</style>