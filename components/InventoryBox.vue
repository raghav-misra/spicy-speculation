<template>
    <div class="inventory-box content overlay-element small">
        <h2 class="allcaps">Inventory</h2>
        <hr style="--accent: white;">
        <div>
            <template v-for="(amount, spice) in player.inventory">
                <h3 v-if="amount > 0">{{ spice }}: {{ amount }}</h3>
            </template>
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