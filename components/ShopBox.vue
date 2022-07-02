<script setup lang="ts">
const market = useMarket()
const shopState = useShopState();
const currentMessage = ref<string | null>(null);
const player = usePlayer()
async function purchaseItem(item: IShopItem) {
    currentMessage.value = shopState.value.callback(item);
    await wait(1500);
    currentMessage.value = null;
}

watchEffect(()=>{
    if(shopState.value.isShowing){
        market.value.isEnabled  = false;
    }else{
        market.value.isEnabled  = true;
    }
})
</script>

<template>
    <div class="store-container">
        <div class="store-box content overlay-element" v-if="shopState.isShowing">
            <h1 class="allcaps">{{ shopState.title }}</h1>
            {{player.inventory}}
            {{player.money}}
            <hr style="--accent: white;">
            <p class="text small">
                {{ currentMessage || "Purchase items to add them to your inventory!" }}
            </p>
            <hr style="--accent: white;">
            <div class="store-items">
                <div class="store-item" v-for="item in shopState.items">
                    <div class="item-info">
                        <h2 class="text">{{ item.name }}</h2>
                        <p class="text small">{{ item.description }}</p>
                    </div>
                    <button 
                        class="text small" 
                        style="--accent: var(--green)"
                        @click="purchaseItem(item)"    
                    >
                        ${{ item.price }}
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