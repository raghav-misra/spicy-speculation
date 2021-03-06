<script setup lang="ts">
const dialogState = useDialogState();
const buttons = ref<HTMLButtonElement[]>([]);
const playerLocked = useMovementLocked();
const isButtonsDisabled = ref(true);
const player = usePlayer();

function endDialog(responseType: string) {
    audio.next.play()
    dialogState.value.isShowing = false;
    dialogState.value.callback(responseType);
    dialogState.value.callback = null;
}

onMounted(() => {
    if (dialogState.value.isShowing) {
        buttons.value[0]?.focus();
    }
});

watchEffect(async ()=>{
    if(dialogState.value.isShowing){
       playerLocked.value = true;
       audio.next.play()
       isButtonsDisabled.value = true;
       await wait(1000);
       isButtonsDisabled.value = false;
    }else{
       playerLocked.value = false;
    }
});

const trueDisabledCheck = computed(() => player.value.isTutorial && isButtonsDisabled.value);
</script>

<template>
    <div class="interaction-container">
        <div class="interaction-box content overlay-element" v-if="dialogState.isShowing">
            <h1 class="allcaps">{{ dialogState.title }}</h1>
            <hr style="--accent: white;">
            <p 
                class="text" 
                v-if="dialogState.text !== ''"
            >
                {{ dialogState.text }}
            </p>
            <br>
            <div>
                <button 
                    v-for="(btn, i) in dialogState.buttons"
                    :ref="el => buttons.push(el as HTMLButtonElement)"
                    :style="`--accent: ${btn.accent}; opacity: ${trueDisabledCheck ? 0.25 : 1} !important;`"
                    class="text"
                    @click="endDialog(btn.id)"
                    :disabled="trueDisabledCheck"
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
}

button {
    margin-right: 1.5rem;
}
</style>