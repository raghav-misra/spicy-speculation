<script setup lang="ts">
import { Chart } from 'chart.js';
const history = useMarketHistory();
const isShowing = useIsMarketTrendDisplaying();


function closeByOverlayClick(e: MouseEvent) {
    if ((e.target as HTMLElement).classList.contains("trends-container")) {
        close()
    }
}

function close() {
    isShowing.value = false;
    // audio.close.play()
}

let chart: Chart | null = null;
const canvas = ref<HTMLCanvasElement>(null);
onMounted(async () => {
    await nextTick();
    await nextTick();

    chart = new Chart(canvas.value.getContext("2d"), {
        type: 'line',
        data: {
            datasets: [],
            labels: [],
        },
        options: {
            responsive: false,
            maintainAspectRatio: false,
            elements: {
                point: {
                    radius: 0
                }
            }
        }
    });

    //@ts-ignore
    window.chart = chart;
    
    await nextTick();

    setInterval(() => {
        const colors = ["red", "green", "blue", "yellow", "orange"]; 
        const newData = JSON.parse(JSON.stringify(history.value));

        // newData.datasets.forEach((d1, i) => {
        //     const dataset = chart.data.datasets.find(d2 => d2.label === d1.label);
        //     if (dataset) {
        //         dataset.data.push(d1.data[d1.length - 1]);
        //     } else {
        //         chart.data.datasets.push({
        //             ...d1,
        //             borderColor: colors[i],
        //         })
        //     }
        // });

        // console.log(history.value);
        // chart.data.labels = JSON.parse(JSON.stringify([...history.value.labels]));

        chart.data = {
            datasets: newData.datasets.map((dataset, i) => ({
                ...dataset,
                borderColor: colors[i],
            })),   
            labels: newData.labels
        };

        chart.update("none");
    }, 500);
});
</script>

<template>
    <div class="overlay trends-container" v-show="isShowing" @click="closeByOverlayClick">
        <div class="chart overlay-element">
            <h1 class="allcaps white">Market Trends:</h1>
            <canvas ref="canvas" :height="187 * 2.5" :width="375 * 2.5"></canvas>
        </div>
    </div>
</template>

<style scoped>
.trends-container {
    background: rgba(0, 0, 0, 0.45);
    pointer-events: all;
    display: flex;
    justify-content: center;
    align-items: center;
}

.chart {
    width: 70vw;
    overflow-x: scroll;
}

canvas {
    aspect-ratio: 2;
    width: 100% !important;
    height: calc(35vw - 2rem) !important;
    pointer-events: none;
    filter: invert(1);
}
</style>