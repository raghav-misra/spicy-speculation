<template>
    <div class="market-price-container content overlay-element">
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
.market-price-container{
    background-color: var(--black);
    border-width: 5px;
    position: absolute;
    color:white;
    right: 1.5rem;
    top: 1.5rem;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
</style>