<script setup lang="ts">
const isShowing = useIsNewspaperOpen();

function open(){
    isShowing.value = true;
    // audio.openNews.play();
}

</script>

<template>
    <div class="overlay-element allcaps white small" role="button" @click="open">
        <h2>My Inventory</h2>
    </div>
</template>