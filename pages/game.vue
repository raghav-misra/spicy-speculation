<script setup lang="ts">
try {
    const game = usePhaser();
    initMarket();
    game.value.scene.start("Hub");
    audio.bg.play()
    audio.bg.fade(0,0.1,2000)
} catch (error) {
    location.href = "/";
}
</script>

<template>
    <main class="overlay" style="pointer-events: none;">
        <DialogBox style="--z: 1;" />
        <HintBox style="--z: 1;" />
        <ShopBox style="--z: 2;" />
        
        <NewspaperBox style="--z: 4;" /> 
        <PortBox style="--z: 4;" />
        <ExportBox style="--z: 4;" />

        <div class="overlay-edge left-edge">
            <MoneyBox style="--z: 3;" />
            <InventoryBox style="--z: 3;" />
        </div>

        <div class="overlay-edge right-edge">
            <NewsOpenBox style="--z: 3;" />
            <MarketPriceBox style="--z: 2;" />
        </div>
    </main>
</template>

<style>
.overlay-edge {
    pointer-events: none;
    position: fixed;
    display: flex;
    flex-direction: column;
    overflow: visible;
    top: 0;
    bottom: 0;
}

.right-edge {
    right: 0;
}

.left-edge {
    left: 0;
}

.overlay-edge > .overlay-element {
    margin: 2rem;
    margin-bottom: 0;
    width: 15rem;
    text-align: center;
}
</style>