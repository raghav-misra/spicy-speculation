<script setup lang="ts">
const dialogData = {
    isShowing: true,
    title: "Renegade Raider",
    text: "Would you like to purchase the battle pass?",
    buttons: [
        {
            text: "Yes, of course!!",
            accent: "var(--green)",
            onClick() {
                alert("Insufficient funds to purchase the battle pass!");
            }
        }, {
            text: "No bozo",
            accent: "var(--red)",
            onClick() {
                alert("L Ratio bozo!");
            }
        }
    ]
};
</script>

<template>
    <div class="interaction-container">
        <div class="interaction-box content overlay-element" v-if="dialogData.isShowing">
            <h1 class="allcaps">{{ dialogData.title }}</h1>
            <hr style="--accent: white;">
            <p class="text">{{ dialogData.text}}</p>
            <br>
            <div>
                <button 
                    v-for="btn in dialogData.buttons"
                    :style="`--accent: ${btn.accent};`"
                    class="text"
                    @click="btn.onClick"
                >
                    {{ btn.text }}
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
:not(button) {
    color: white;
}

.interaction-container {
    position: fixed;
    bottom: 1rem;
    left: 1rem;
    right: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: visible
}

.interaction-box {
    flex: 1;
    margin: 0 7.5rem;
    border: 10px white solid, 10px var(--black) solid;
    padding: 2rem;
    border-radius: 5px;
    background: var(--black);
    box-shadow: 0 -10px 50px var(--black);
}

button {
    margin-right: 1.5rem;
}
</style>