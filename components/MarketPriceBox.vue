<script setup lang="ts">
const market = useMarket();
const isTrendsShowing = useIsMarketTrendDisplaying();
const overlayState = useOverlayState();
</script>

<template>
    <div 
        class="market-price-box content overlay-element small"
        :class="{ 'is-pulsing': overlayState.marketPriceBox.isPulsing }"
        v-show="overlayState.marketPriceBox.isShowing"
    >
        <h2 class="allcaps">
            Spice Market
            <span class="text small">📈</span>
        </h2>
        <hr style="--accent: white;">
        <div class="prices-container">
            <h3 v-for="spice in market.prices" class="price">
                <span class="spice-name">{{spice.name}}:</span> 
                <span class="price-amount">
                    ${{spice.price}}
                </span>
            </h3>
        </div>
        <h3>
            <a href="#" style="color: var(--green)" @click="isTrendsShowing = true;">View Trends</a>
        </h3>
    </div>
</template>

<style scoped>
.market-price-box { 
    color:white;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.prices-container {
    text-align: left;
}

h3.price {
    display: flex;
}

.spice-name {
    margin-right: 1.5rem;
}

.price-amount {
    margin-left: auto;
}
</style>