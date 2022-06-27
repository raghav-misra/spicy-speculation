<script setup lang="ts">
const game = usePhaser();

game.value.scene.start("Hub");
</script>

<template>
    <main id="overlay" class="overlay"></main>
</template>

<style>

</style>