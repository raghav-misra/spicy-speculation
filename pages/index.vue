<script setup lang="ts">
const router = useRouter();


const stage = ref(0);

const isLeavingOnboarding = ref(false);

watchEffect(async () => {
    if (stage.value === 2) {
        await useWait(10000);
        isLeavingOnboarding.value = true;
        await useWait(3000);
        router.push("/game");
    }
});
</script>

<template>
    <div class="overlay onboarding">
        <Transition name="list" mode="out-in">
            <div v-if="stage === 0" class="center splash">
                <img class="logo" src="~~/assets/ship.png">
                <h1 class="title white big">
                    Spice Race
                </h1>
                <br>

                <button class="text" style="--accent: white;" @click="stage++">
                    Play!
                </button>
                <nuxt-link to="/game">
                    <button class="text" style="--accent: white;">
                        Debug
                    </button>
                </nuxt-link>
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

                <img src="~~/assets/ship.png" class="ship">
            </div>
        </Transition>
    </div>
</template>

<style>
.logo {
    max-height: 50vh;
    filter: invert(1) brightness(1) drop-shadow(0 0 50px var(--blue));
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
    width: 200px;
    filter: invert(1) brightness(1) drop-shadow(0 0 50px var(--blue));
    top: calc(50% - 25px);

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
    transition: all 0.25s ease;
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
        transform: translateY(100px) scale(0.95);
    }
}
</style>