<script setup>
import { ref, defineEmits, defineModel, watch } from 'vue';
import { PolarAreaChart } from 'vue-chart-3';
import { Chart, registerables } from 'chart.js';

const modelValue = defineModel('modelValue');
const emits = defineEmits(["chart"]);

const data = ref([3,3,3,3]);

watch(modelValue, (value) => {
  data.value = [
    value.physic.value,
    value.emotion.value,
    value.social.value,
    value.economy.value,
  ];
}, {deep: true});

function handleChartUpdated(chart) {
  emits('chart', chart.toBase64Image());
}

const plugin = {
  id: 'customCanvasBackgroundColor',
  beforeDraw: (chart, args, options) => {
    const {ctx} = chart;
    ctx.save();
    ctx.globalCompositeOperation = 'destination-over';
    ctx.fillStyle = options.color || '#AECEF3FF';
    ctx.fillRect(0, 0, chart.width, chart.height);
    ctx.restore();
  }
};
Chart.register(plugin,...registerables);

const chartDefinition = ref({
  labels: [
    'physic',
    'emotion',
    'social',
    'economy',
  ],
  datasets: [
    {
      label: 'Current Status',
      data: data,
      fill: true,
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(75, 192, 192)',
        'rgb(255, 205, 86)',
        'rgb(201, 203, 207)',
      ],
    },
  ],
  options: {
    plugins: {
      legend: {
        position: 'bottom'
      },
      customCanvasBackgroundColor: {
        color: 'lightGreen',
      }
    }
  },
  plugins: [plugin],
});


</script>

<template>
  <PolarAreaChart :chartData="chartDefinition" @chart:update="handleChartUpdated"/>
</template>

<style scoped>

</style>