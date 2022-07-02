<template>
    <div class="inventory-box content overlay-element">
        <h2 class="allcaps">Spice Market</h2>
        <hr style="--accent: white;">
        <div>
            <h3 v-for="(amount, spice) in player.inventory">{{ spice }}: {{ amount }}</h3>
        </div>
    </div>
</template>

<script setup lang="ts">
const player = usePlayer()
</script>

<style scoped>
.inventory-box { 
    color:white;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
</style>