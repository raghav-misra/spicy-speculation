<script setup lang="ts">
const portSettings = usePortDisplayState();
const playerState = usePlayer();

function closeByOverlayClick(e: MouseEvent) {
    if ((e.target as HTMLElement).classList.contains("port-container")) {
        portSettings.value.isShowing = false;
    }
}

const importingPortsCount = computed(
    () => playerState.value.ports.filter(p => p.direction === "import").length
);
const exportingPortsCount = computed(
    () => playerState.value.ports.filter(p => p.direction === "export").length
);
</script>

<template>
    <div class="overlay port-container" v-if="portSettings.isShowing" @click="closeByOverlayClick">
        <div class="overlay-element port content white">
            <header>
                <h1 class="allcaps text big">{{ info.island }} docks</h1>
                <button 
                    style="--accent: var(--red);"
                    class="text small"
                    @click="portSettings.isShowing = false;"
                >
                    close
                </button>
            </header>
            <hr style="--accent: white;">
            <div class="content">
                <h1>
                    Your docks can have two types of ports:<br>
                    <div class="text">
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        ports for <i>importing</i> and for
                        <i>exporting</i> spices.
                    </div>
                </h1>

                <hr style="--accent: white;">

                <div class="description-container">
                    <div class="port-type">
                        <p>
                            <span class="underline text">Importing</span>
                            
                        </p>
                        <br>
                        <p class="text small">
                            You have {{ importingPortsCount }} inbound ports!
                        </p>
                        <br>

                        <button class="text small" style="--accent: var(--blue);">
                            Buy an inbound port!
                        </button>
                    </div>

                    <div class="port-type">
                        <p class="text">
                            <span class="underline">Exporting</span>
                        </p>
                        <br>
                        <p class="text small">
                            You have {{ exportingPortsCount }} outbound ports!
                        </p>
                        <br>

                        <button class="text small" style="--accent: var(--green);">
                            Buy a outbound port!
                        </button>
                    </div>
                </div>

                <hr style="--accent: white;">
                <p class="text center">
                    "{{ portSettings.message || "Can I get a Port on the docks, please?" }}"
                </p>
            </div>
        </div>
    </div>
</template>

<style scoped>
button.overlay-element {
    position: fixed;
    top: 1.5rem;
    left: 1.5rem;
}

button.overlay-element h1 {
    position: relative;
    bottom: 4px;
}

.port-container {
    pointer-events: all;
    background: rgba(0, 0, 0, 0.45);
    display: flex;
    justify-content: center;
    align-items: center;
}

.port {
    width: min(max(60vw, 500px), calc(100%));
}

.description-container {
    display: flex;
    padding-bottom: 0.5rem;
}

.description-container .port-type {
    flex: 1;
}

.description-container .port-type:last-of-type {
    margin-left: 2rem;
    text-align: right;
}

header {
    display: flex;
    align-items: center;
}

header h1 {
    flex: 1;
}
</style>