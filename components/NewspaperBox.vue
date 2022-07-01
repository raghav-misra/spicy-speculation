<script setup lang="ts">
const isShowing = ref(false);

function closeByOverlayClick(e: MouseEvent) {
    if ((e.target as HTMLElement).classList.contains("newspaper-container")) {
        isShowing.value = false;
    }
}
</script>

<template>
    <button class="overlay-element allcaps small white" @click="isShowing = true;">
        <h1>Island News 📖</h1>
    </button>

    <div class="overlay newspaper-container" v-if="isShowing" @click="closeByOverlayClick">
        <div class="overlay-element newspaper content white">
            <header>
                <h1 class="allcaps text big">The {{ info.island }} Gazette</h1>
                <button 
                    style="--accent: var(--red);"
                    class="text small"
                    @click="isShowing = false;"
                >
                    close
                </button>
            </header>
            <hr style="--accent: white;">
            <div class="article-container content">
                <article>
                    <h1 class="text">
                        Fortnite collaboration coming to {{ info.island }}!
                        — <i class="allcaps">day 0</i>
                    </h1>
                    <p class="text small">
                        Featuring limited edition Fortnite<sup>TM</sup> items, including
                        Renegade Raider and VBUCKS!!!!!
                    </p>
                </article>
            </div>
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