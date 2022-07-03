<script setup lang="ts">
const overlayState = useOverlayState();
</script>

<template>
    <details 
        class="inventory-box content overlay-element small" 
        v-show="overlayState.inventoryBox.isShowing"
    >
        <summary role="button">
            <h2 class="allcaps">
                Notepad
                <span class="text small">📝</span>
            </h2>
        </summary>
        <hr style="--accent: white; margin-top: 1rem;">
        <textarea 
            placeholder="Write down notes: any prices or spices you need to save for later." 
            @focus="setMovementLocked(true)"
            @blur="setMovementLocked(false)"
        />
    </details>
</template>

<style scoped>
summary {
    display: flex;
    margin-bottom: 0 !important;
    justify-content: center;
}

.inventory-box { 
    color:white;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.prices-container {
    text-align: left;
}

textarea {
    width: 100%;
    padding: 0.5rem;
    height: 8rem;
    background: none;
    border: 1px white solid;
    border-radius: 7px;
    color: white;
    font-size: 1.125rem;
}

h3.price {
    display: flex;
}

.spice-name {
    margin-right: 1.5rem;
}

.price-amount {
    margin-left: auto;
}
</style>