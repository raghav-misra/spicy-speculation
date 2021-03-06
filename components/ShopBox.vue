<script setup lang="ts">
const market = useMarket()
const shopState = useShopState();
const currentMessage = ref<string | null>(null);
const player = usePlayer()
const playerLocked = useMovementLocked();

const stocks = ref<Record<string, number>>({});
const amount = ref(1);

const choiceItems = [1, 5, 10, 100]

async function purchaseItem(item: IShopItem) {
    audio.purchase.play();
    if (amount.value > stocks.value[item.name]) {
        currentMessage.value = `Whoops! You can't buy that much ${item.name}!`;
    } else {
        currentMessage.value = shopState.value.callback(item, amount.value);
        if (!currentMessage.value.includes("bozo")) {
            stocks.value[item.name] -= amount.value;
        }
    }
    
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
        audio.openShop.play()
    }else{
        market.value.isEnabled  = true;
        playerLocked.value = false;
        audio.close.play()
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
                    <SpiceIcon :name="item.name" />

                    <div class="item-info">
                        <h2 class="text">
                            <span>{{ item.name }}</span>

                            <span class="text small">
                                ({{item.stock}} left)
                            </span>

                            <span class="text">|</span>

                            <span class="text small">
                                Amount:
                            </span>

                            <select 
                                v-model.number="amount"
                                class="text small"
                                type="number" 
                                min="1"
                                style="--accent: white; width: 5rem;"
                            >
                                <template v-for="count of choiceItems">
                                    <option v-if="count <= stocks[item.name]">
                                        {{ count }}
                                    </option>
                                </template>
                                <option :value="stocks[item.name]">
                                    {{ stocks[item.name] }}
                                </option>
                            </select>

                            
                        </h2>
                        <p class="text small">{{ item.description }}</p>
                    </div>
                    <button 
                        class="text small" 
                        :style="`--accent: var(--${stocks[item.name] === 0? 'red' : 'green'})`"
                        @click="purchaseItem(item)"
                        :disabled="stocks[item.name] === 0"    
                    >
                        {{ 
                            stocks[item.name] === 0 ? 
                                "all out!" : 
                                `$${(item.price * amount).toLocaleString()}`
                        }}
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
    top: 2rem;
    bottom: 1rem;
    left: 2rem;
    overflow: hidden;
}

.store-box {
    width: 600px;
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

.store-item h2 {
    display: flex;
    align-items: center;
}

.store-item h2 > * {
    margin-right: 0.5rem;
}

.store-item button {
    margin-left: 1rem;
}
</style>