<script setup lang="ts">
const market = useMarket()
const shopState = useShopState();
const currentMessage = ref<string | null>(null);
const player = usePlayer()
const playerLocked = useMovementLocked();

const stocks = ref<Record<string, number>>({});

async function purchaseItem(item: IShopItem) {
    stocks.value[item.name]--;
    currentMessage.value = shopState.value.callback(item);
    await wait(1500);
    currentMessage.value = null;
}

watch(() => shopState.value, () => {
    const newStocks = Object.create(null);
    shopState.value.items.map(item => {
        newStocks[item.name] = item.stock;
    });

    stocks.value = newStocks;
});
watchEffect(() => {
    if(shopState.value.isShowing){
        market.value.isEnabled  = false;
        playerLocked.value = true;
    }else{
        market.value.isEnabled  = true;
        playerLocked.value = false;
    }
})
</script>

<template>
    <div class="store-container">
        <div class="store-box content overlay-element" v-if="shopState.isShowing">
            <h1 class="allcaps">{{ shopState.title }}</h1>
            <hr style="--accent: white;">
            <p class="text small">
                {{ currentMessage || "Purchase items to add them to your inventory!" }}
            </p>
            <hr style="--accent: white;">
            <div class="store-items">
                <div class="store-item" v-for="item in shopState.items">
                    <div class="item-info">
                        <h2 class="text">
                            {{ item.name }} ({{ item.stock - stocks[item.name] }}/{{ item.stock }})
                        </h2>
                        <p class="text small">{{ item.description }}</p>
                    </div>
                    <button 
                        class="text small" 
                        :style="`--accent: var(--${stocks[item.name] === 0? 'red' : 'green'})`"
                        @click="purchaseItem(item)"
                        :disabled="stocks[item.name] === 0"    
                    >
                        {{ stocks[item.name] === 0 ? "all out!" : `$${item.price}` }}
                    </button>
                </div>
            </div>
            <hr style="--accent: white;">
            <button 
                class="text" 
                style="--accent: var(--blue);" 
                @click="shopState.isShowing = null;"
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
    top: 1.5rem;
    bottom: 1rem;
    left: 1.5rem;
    overflow: hidden;
}

.store-box {
    width: min(max(40vw, 500px), calc(100vw - 3rem));
}

.store-box, .store-items {
    flex: 1;
    margin: 0;
}

.store-items {
    align-self: stretch;
    text-align: left;
    overflow-y: scroll;
    margin-bottom: 1rem;
}

.store-item {
    display: flex;
    margin-bottom: 1rem;
    margin-right: 1rem;
    align-items: flex-start;
}

.store-item .item-info {
    flex: 1;
}

.store-item button {
    margin-left: 1rem;
}
</style>