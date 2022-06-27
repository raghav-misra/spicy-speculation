<script setup lang="ts">
const props = defineProps<{
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
    width?: string;
    height?: string;
}>();
</script>

<template>
    <div 
        style="position: fixed;"
        :style="{ top, bottom, left, right, width, height }"
    >
        <slot />
    </div>
</template>