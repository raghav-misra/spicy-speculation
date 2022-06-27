<script setup lang="ts">
const game = usePhaser();

game.value.scene.start("Hub");
</script>

<template>
    <main class="overlay">
        <InteractionBox />
    </main>
</template>

<style>

</style>