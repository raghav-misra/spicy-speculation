<template>
    <div class="market-price-container content">
        <h2>Spice Market</h2>
        <hr style="--accent: white;">
        <ul>
            <li v-for="spice in market">
                <h3>{{spice.name}}: ${{spice.price}}</h3>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
const market = useMarket()
</script>

<style scoped>
.market-price-container{
    background-color: #342E37;
    padding: 2rem;
    position: absolute;
    color:white;
    right:0;
    text-align: right;
}
</style>