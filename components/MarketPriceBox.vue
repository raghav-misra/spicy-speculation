<template>
    <div class="market-price-box content overlay-element small">
        <h2 class="allcaps">
            Spice Market
            <span class="text small">📈</span>
        </h2>
        <hr style="--accent: white;">
        <div>
            <h3 v-for="spice in market.prices">{{spice.name}}: ${{spice.price}}</h3>
            <h3><a href="#" style="color: var(--green)" @click="isTrendsShowing = true;">View Trends</a></h3>
        </div>
    </div>
</template>

<script setup lang="ts">
const market = useMarket();
const isTrendsShowing = useIsMarketTrendDisplaying();
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