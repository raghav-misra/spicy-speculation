<script setup lang="ts">
const isShowing = useState("isPortBoxShowing", () => false);
const playerState = usePlayer();

function closeByOverlayClick(e: MouseEvent) {
    if ((e.target as HTMLElement).classList.contains("newspaper-container")) {
        isShowing.value = false;
    }
}

const importingPorts = computed(() => playerState.value.ports.filter(p => p.direction === "import"));
const exportingPorts = computed(() => playerState.value.ports.filter(p => p.direction === "export"));
</script>

<template>
    <div class="overlay newspaper-container" v-if="isShowing" @click="closeByOverlayClick">
        <div class="overlay-element newspaper content white">
            <header>
                <h1 class="allcaps text big">{{ info.island }} docks</h1>
                <button 
                    style="--accent: var(--red);"
                    class="text small"
                    @click="isShowing = false;"
                >
                    close
                </button>
            </header>
            <hr style="--accent: white;">
            
        </div>
    </div>
</template>

<style scoped>
button.overlay-element {
    position: fixed;
    top: 1.5rem;
    left: 1.5rem;
}

button.overlay-element h1 {
    position: relative;
    bottom: 4px;
}

.newspaper-container {
    pointer-events: all;
    background: rgba(0, 0, 0, 0.45);
    display: flex;
    justify-content: center;
    align-items: center;
}

.newspaper {
    width: min(max(80vw, 500px), calc(100%));
}

header {
    display: flex;
    align-items: center;
}

header h1 {
    flex: 1;
}
</style>