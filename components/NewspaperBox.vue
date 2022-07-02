<script setup lang="ts">
const isShowing = useIsNewspaperOpen();
const newsArticles = useNewsArticles();

function closeByOverlayClick(e: MouseEvent) {
    if ((e.target as HTMLElement).classList.contains("newspaper-container")) {
        close()
    }
}

function close(){
    isShowing.value = false;
    audio.close.play()
}
</script>

<template>
    <div class="overlay newspaper-container" v-if="isShowing" @click="closeByOverlayClick">
        <div class="overlay-element newspaper content white">
            <header>
                <h1 class="allcaps text big">The {{ info.island }} Gazette</h1>
                <button 
                    style="--accent: var(--red);"
                    class="text small"
                    @click="close"
                >
                    close
                </button>
            </header>
            <hr style="--accent: white;">
            <div class="article-container content">
                <article v-for="article in newsArticles">
                    <h1 class="text">
                        {{ article.title }}
                        — <i class="allcaps">day {{ article.day }}</i>
                    </h1>
                    <p class="text small">
                        {{ article.text }}
                    </p>
                </article>
                <article v-if="newsArticles.length === 0">
                    <h1>
                        Nothing here yet, keep exploring!
                    </h1>

                    <p class="text small">
                        {{ info.country }}'s trusty news reporters and journalist will keep
                        you and the rest of {{ info.island }} up to date!
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