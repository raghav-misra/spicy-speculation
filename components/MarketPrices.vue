<template>
    <div class="market-price-container">
        <h1>Spice Market</h1>
        <ul>
            <li v-for="spice in market">
                {{spice.name}}: {{spice.price}}
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
    right:0
}
</style>