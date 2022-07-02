<template>
    <canvas ref="canvas"></canvas>
</template>

<script setup lang="ts">
import * as ChartJs from 'chart.js';
const history = useMarketHistory()
const { Chart } = ChartJs;


let chart = null
const canvas = ref<HTMLCanvasElement>(null)
onMounted(()=>{
    chart = new Chart(
        canvas.value.getContext('2d'), {
            type: 'line',
            data: history.value
        }
    )
})

watch(()=>history,()=>{
    chart && chart.update()
},{deep:true})
</script>