<script setup lang="ts">
const hint = useState<string>("hint")
</script>

<template>
    <div class="hint-container">
        <div class="hint-box content overlay-element" v-if="hint">
            <span 
                class="text" 
            >
                {{ hint }}
            </span>
        </div>
    </div>
</template>

<style scoped>
:not(button) {
    color: white;
}

.hint-container {
    position: fixed;
    bottom: 1rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: visible;
    width: 45%;
    
}

.hint-box {
    flex: 1;
    justify-content: center;
    align-items: center;
    display: flex;
}

button {
    margin-right: 1.5rem;
}
</style>