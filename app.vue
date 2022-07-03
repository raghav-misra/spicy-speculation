<script setup lang="ts">
</script>

<template>
    <NuxtPage />
    <canvas id="canvas"/>
</template>

<script setup>
onMounted(() => {
    createPhaser()
});

try{
    window.localStorage.length
}catch(e){
    alert("Hi, please open this page in a NEW tab or window. This game requires the use of localStorage to function. Unfortunately, embedded windows do not support localStorage.")
}
</script>

<style>

</style>