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
}

watchEffect(()=>{
    if(isShowing.value){
        audio.openNews.play()
    }else{
        audio.close.play()
    }
})

const colors = ['#3772ff', '#b5446e', '#2a9d8f', '#ffc857', '#f0e7d8', '#ed6a5e', '#861388', '#64a6bd', '#8cb369', '#4f345a', '#8783d1']; 

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
        <div class="chart overlay-element content">
            <header>
                <h1 class="allcaps text big white">Market Trends</h1>
                
                <button 
                        style="--accent: var(--red);"
                        class="text small"
                        @click="close"
                    >
                        close
                </button>
            </header>

            <hr style="--accent: white;">

            <canvas ref="canvas" :height="187 * 2.5" :width="375 * 2.5"></canvas>
        </div>
    </div>
</template>

<style scoped>
.trends-container {
    background: rgba(0, 0, 0, 0.45);
    pointer-events: all;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.chart {
    width: 70vw;
    overflow-x: scroll;
}

header {
    display: flex;
    align-items: center;
}

header h1 {
    flex: 1;
}

canvas {
    aspect-ratio: 2;
    width: 100% !important;
    /* height: calc(35vw - 2rem) !important; */
    pointer-events: none;
    filter: invert(1);
}
</style>