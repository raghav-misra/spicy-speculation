<script setup lang="ts">
const game = usePhaser();

game.value.scene.start("Hub");
</script>

<template>
    <main class="overlay" style="pointer-events: none;">
        <InteractionBox />
    </main>
</template>

<style>

</style>