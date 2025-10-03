<script setup>
import { ref, defineModel, defineExpose, watch } from 'vue';
import { PolarAreaChart, RadarChart } from 'vue-chart-3';
import { Chart, registerables } from 'chart.js';

const modelValue = defineModel('modelValue');
const props = defineProps(["topics"]);

const data = ref([3,3,3,3]);
const max = ref([50,50,50,50]);

const chartController = ref(null);

watch(modelValue, (value) => {
  data.value = [
    value.a.value,
    value.b.value,
    value.c.value,
    value.d.value,
  ];
  max.value = [value.max, value.max, value.max, value.max];
}, {deep: true});

const convertDataUrlToBlob = (dataUrl) =>{
  const arr = dataUrl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new Blob([u8arr], {type: mime});
}


const getChartImage = () => {
  return convertDataUrlToBlob( chartController.value.chartInstance.toBase64Image() )
}

const plugin = {
  id: 'customCanvasBackgroundColor',
  beforeDraw: (chart, args, options) => {
    const {ctx} = chart;
    ctx.save();
    ctx.globalCompositeOperation = 'destination-over';
    ctx.fillStyle = options.color || 'lightGreen';
    ctx.fillRect(0, 0, chart.width, chart.height);
    ctx.restore();
  }
};

Chart.register(...registerables,plugin);

const chartDefinition = ref({
  labels: [
    props.topics.a,
    props.topics.b,
    props.topics.c,
    props.topics.d,
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
        'rgb(30,98,234)',
      ],
    },
    {
      data: max,
      fill: false
    },
  ],
});

const chartOptions = ref({
  responsive: true,
  scales: {
    r: {
      ticks: {
        color: 'rgb(236,243,241)',
      },
    }
  },
  plugins: {
    title: {
      display: true,
      text: "How I feel today"
    },
    legend: {
      position: 'left',
    },
    customCanvasBackgroundColor: {
      color: 'rgb(236,243,241)',
    }
  }
});

defineExpose({
  getChartImage
});

</script>

<template>
  <polar-area-chart :chartData="chartDefinition" :options="chartOptions" ref="chartController"/>
</template>

<style scoped>

</style>