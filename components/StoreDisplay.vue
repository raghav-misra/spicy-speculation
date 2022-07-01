<script setup lang="ts">
const storeState = useStoreState();
const storeCallback = useStoreCallback();

function purchaseItem(responseType: any) {
    storeCallback.value(responseType);
}
</script>

<template>
    <div class="store-container">
        <div class="store-box content overlay-element" v-if="storeState.isShowing">
            <h1 class="allcaps">{{ storeState.title }}</h1>
            <hr style="--accent: white;">
            <div class="store-items">
                <div class="store-item" v-for="item in storeState.items">
                    <div class="item-info">
                        <h2 class="text">{{ item.name }}</h2>
                        <p class="text small">{{ item.description }}</p>
                    </div>
                    <button 
                        class="text small" 
                        style="--accent: var(--green)"
                        @click="purchaseItem(item.responseType)"    
                    >
                        {{ item.displayPrice }}
                    </button>
                </div>
            </div>
            <hr style="--accent: white;">
            <button 
                class="text" 
                style="--accent: var(--blue);" 
                @click="storeState.isShowing = null;"
            >
                Close
            </button>
        </div>
    </div>
</template>

<style scoped>
:not(button) {
    color: white;
}

.store-container, .store-box {
    display: flex;
    align-items: center;
    flex-direction: column;
}

.store-container {
    position: fixed;
    top: 1rem;
    bottom: 1rem;
    left: 1rem;
    overflow: hidden;
}

.store-box, .store-items {
    flex: 1;
    margin: 0;
}

.store-items {
    align-self: stretch;
    text-align: left;
}

.store-item {
    display: flex;
    margin-bottom: 1rem;
    align-items: center;
}

.store-item button {
    margin-left: 1rem;
}
</style>