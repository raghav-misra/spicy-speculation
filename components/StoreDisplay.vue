<script setup lang="ts">
const storeState = ref({
    isShowing: true,
    title: "Fortnite Item Shop",
    items: [
        {
            name: "Renegade Raider",
            displayPrice: "$100",
            onPurchase() {}
        },
        {
            name: "Renegade Raider",
            displayPrice: "$100",
            onPurchase() {}
        },
    ]
});
</script>

<template>
    <div class="store-container">
        <div class="store-box content overlay-element" v-if="storeState.isShowing">
            <h1 class="allcaps">{{ storeState.title }}</h1>
            <hr style="--accent: white;">
            <div class="store-items">
                <div class="store-item" v-for="item in storeState.items">
                    <h2>{{ item.name }}</h2>
                    <button class="text small" style="--accent: var(--blue)">
                        deej
                    </button>
                </div>
            </div>
            <hr style="--accent: white;">
            <button class="text" style="--accent: var(--green);" @click="storeState.isShowing = false;">
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
</style>