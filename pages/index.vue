<script setup lang="ts">
const router = useRouter();

const stage = ref(0);
const hasSave = localStorage.getItem("market") !== null;

const spiceImages = Object.values({
    "Pepper": "pepper.png",
    "Saffron": "saffron.png",
    "Cardamom": "cardamom.png",
    "Fortnite": "wolf.png",
    "Cinnamon": "cinnamon.png",
    "Dragon Petals": "dragon_petals.png",
    "Queen's Herb": "queen.png",
    "Kibuseed": "kibuseed.png",
});

const isLeavingOnboarding = ref(false);

function load(){
    loadGame()
    navigateTo("/game")
}

function newGame(){
    initMarket()
    navigateTo("/game")
}

watchEffect(async () => {
    if (stage.value === 1) {
        await wait(325);
        audio.openNews.play();
    }
    if (stage.value === 2) {
        audio.waves.play();
        await wait(10000);
        isLeavingOnboarding.value = true;
        await wait(3000);
        newGame()
    }
});
</script>

<template>

    <div class="overlay onboarding">
        <div class="overlay spice-overlay" style="z-index: -1;">
            <div class="image-background">
                <div v-for="spiceImage in spiceImages.slice(0, 4)">
                    <img :src="`/spices/${spiceImage}`">
                </div>
            </div>

            <div class="image-background">
                <div v-for="spiceImage in spiceImages.slice(4, 8)">
                    <img :src="`/spices/${spiceImage}`">
                </div>
            </div>
        </div>

        <Transition name="list" mode="out-in">
            <div v-if="stage === 0" class="center splash">
                <div class="contain">
                    <img class="logo" src="/sprites/ship_med.png">
                    <br><br>
                    <h1 class="title white big">
                        Spicy Speculation
                    </h1>
                    <br>
                    <h2 class="text white">
                        Manage a bustling outpost in the heart of the global spice trade.
                    </h2>
                    <br><br>
                    <div class="play-buttons">
                        <button class="text" style="--accent: var(--green);" @click="stage++">
                            New Game
                        </button>
                        <button class="text" style="--accent: var(--brown); margin-left: 1rem;" @click="load" v-if="hasSave">
                            Continue
                        </button>
                    </div>
                </div>
            </div>
            <div v-else-if="stage === 1" class="charter content">
                <h1 class="title center">Charter of {{ info.island }}</h1>

                <hr>

                <p class="text">
                    The country of {{ info.country }} hereby grants the proprietor of {{ info.island }}
                    permission to establish a colony in the {{ info.ocean }}, for the purposes of
                    economic development and cultivation of new spices of foreign lands for {{ info.island }}.
                </p>

                <p class="text">
                    As a colony of {{ info.country }}, {{ info.island }} is granted freedom to make economic
                    decisions within its region, under the condition that all actions are taken solely for the
                    economic benefits of the {{ info.country }} empire.
                </p>

                <hr>

                <div class="center">
                    <button class="text" style="--accent: var(--black);" @click="stage++">
                        Launch the expedition! ⟶
                    </button>
                </div>
            </div>
            <div v-else-if="stage === 2" class="loader">
                <img v-for="c in 20" :style="{
                    animationDelay: `${(c * 50) - 50}ms`,
                    animationName: 'waves',
                }" class="ocean" src="~~/assets/ocean.png">

                <div class="loading-text" :class="{ landed: isLeavingOnboarding }">
                    <h1 class="title white">
                        <Transition name="list" mode="out-in">
                            <span v-if="isLeavingOnboarding">
                                Landed!
                            </span>
                            <span v-else>
                                Sailing to {{ info.island }}...
                            </span>
                        </Transition>
                    </h1>
                </div>

                <img src="/sprites/ship_med.png" class="ship">
            </div>
        </Transition>
    </div>
</template>

<style>
.spice-overlay {
    opacity: 0.75;
    display: flex;
    align-items: stretch;
}

.contain {
    border: 2px white solid;
    padding: 4rem;
    background-color: var(--black);
    border-radius: 20px;
    /* box-shadow: 0 0 25px black; */
}

.image-background {
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr 1fr;
    flex: 1;
    animation: rotate-spice 7.5s infinite linear;
}

@keyframes rotate-spice {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.image-background > div {
    display: flex;
    justify-content: center;
    align-items: center;
}

.image-background img {
    height: 20vh;
    animation: rotate-spice 7.5s infinite linear reverse;
}

.logo {
    max-height: 50vh;
    /* filter: invert(1) brightness(1) drop-shadow(0 0 50px var(--blue)); */
}

.splash {
    overflow: visible;
}

.onboarding {
    background: var(--black);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.charter {
    background: var(--brown);
    padding: 2rem 5rem;
    border-radius: 2rem;
    margin: 2rem;
    max-width: 800px;
    background-image: 
        linear-gradient(#c4a27253, #c4a27296),
        url(~~/assets/charter.jpg);
    background-position: center;
    background-size: cover;
}

.charter .text {
    margin-left: 2rem;
    margin-right: 2rem;
}

.loader {
    display: grid;
    position: relative;
}

.ocean {
    grid-template-rows: 1fr 1fr;
    animation-duration: 10s;
    animation-iteration-count: infinite;
    pointer-events: none;
}

.ship {
    width: 300px;
    top: calc(50% - 25px);
    transform: scaleX(-1);

    position: fixed;
    z-index: 70;

    animation: ship-travel 9s ease-in-out, rise-fall 3s infinite ease-in;
    animation-fill-mode: forwards;
}

.loading-text {
    position: fixed;
    top: 2rem;
    left: 0;
    right: 0;
    text-align: center;
}

.loading-text h1 {
    transition: 0.25s background ease-in-out;
    background: var(--red);
    padding: 1rem;
}

.loading-text.landed h1 {
    background: var(--green);
}

.list-enter-active,
.list-leave-active {
    transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: scale(0.5) rotateY(90deg);
}

@keyframes waves {
    50%  {
        transform: skew(30deg);
    }
}

@keyframes ship-travel {
    0% {
        left: -200px;
    }

    100% {
        left: calc(100% - 200px);
    }
}

@keyframes rise-fall {
    50% {
        transform: translateY(-100px) scaleX(-0.95) scale(0.95);
    }
}
</style>