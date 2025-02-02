<script setup>
import { ref, defineEmits, defineModel, defineExpose, watch } from 'vue';
import { PolarAreaChart } from 'vue-chart-3';
import { Chart, registerables } from 'chart.js';

const modelValue = defineModel('modelValue');

const data = ref([3,3,3,3]);

const chartController = ref(null);

watch(modelValue, (value) => {
  data.value = [
    value.physic.value,
    value.emotion.value,
    value.social.value,
    value.economy.value,
  ];
}, {deep: true});

const getChartImage = () => {
  console.log(chartController.value)
  return chartController.value.chartInstance.toBase64Image();
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

defineExpose({
  getChartImage
});

defineEmits(["chart"]);
</script>

<template>
  <PolarAreaChart :chartData="chartDefinition" ref="chartController"/>
</template>

<style scoped>

</style>