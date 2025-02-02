<script setup>
import {createRestAPIClient} from "masto";
import router from '@/router';
import {instanceStore} from '@/stores/instance';
import FeelingForm from '../components/FeelingForm.vue'
import FeelingChart from '../components/FeelingChart.vue'
import {ref} from "vue";

const instance = instanceStore();
if (!(instance.getUser() || {} ).accessToken) {
  router.push('login')
}

const feeling = {
  physic: ref(0),
  emotion: ref(0),
  social: ref(0),
  economy: ref(0),
  integration: ref(0),
};

const updateChart = () => {
  console.log();
}

let currentImage = null;
const saveChartImage =(image)=> {
  currentImage = image;
}

const publishFeeling = async () => {
  const url = instance.getUser().url;
  const accessToken = instance.getUser().accessToken;
  const masto = createRestAPIClient({
    url: url,
    accessToken: accessToken,
  });
  const response = await masto.v1.media.create({
    file: currentImage,
  })
  const mediaId = response.id;
  const status = await masto.v1.statuses.create({
    status: `#HIFT`,
    visibility: "public",
    mediaIds:[mediaId]
  });
  console.log(status);
  alert("Feeling published");
}

setTimeout(() => {
  feeling.physic.value = 3;
  feeling.emotion.value = 3;
  feeling.social.value = 3;
  feeling.economy.value = 3;
  feeling.integration.value = 3;
}, 1000);

</script>

<template>
  <div class="container row py-4 px-3 mx-auto">
    <div class="col-4 px-0">
      <FeelingForm @save="publishFeeling" @updated="updateChart" v-model="feeling"/>
    </div>
    <div class="col-4 px-0">
      <FeelingChart v-model="feeling" @chart="saveChartImage"/>
    </div>
  </div>
</template>
