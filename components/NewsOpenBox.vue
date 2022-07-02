<script setup lang="ts">
const isShowing = useIsNewspaperOpen();
const overlayState = useOverlayState();

function open(){
    isShowing.value = true;
    audio.openNews.play()
}

</script>

<template>
    <div 
        class="overlay-element allcaps white small" 
        role="button" @click="open"
        :class="{ 'is-pulsing': overlayState.newsOpenBox.isPulsing }"
        v-show="overlayState.newsOpenBox.isShowing"
    >
        <h2>
            Island News
            <span class="text small">📰</span>
        </h2>
    </div>
</template>