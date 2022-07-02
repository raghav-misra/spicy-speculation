<template>
    <div class="money-box overlay-element small">
        <h2 class="allcaps">Money: ${{ player.money }}</h2>
    </div>
</template>

<script setup lang="ts">
const player = usePlayer()
</script>

<style scoped>
.money-box {
    color: white;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
</style>