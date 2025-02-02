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


const chartChild = ref(null);

const logoff = () => {
  instance.removeUser();
  router.push('login');
}

const publishFeeling = async () => {
  const url = instance.getUser().url;
  const accessToken = instance.getUser().accessToken;
  const currentImage = chartChild.value.getChartImage();

  const masto = createRestAPIClient({
    url: url,
    accessToken: accessToken,
  });
  const response = await masto.v1.media.create({
    file: currentImage,
    description:`A radar chart shows four categories:
        physic (light red),
        emotion (light teal),
        economy (light gray),
        and social (gold).
    The physic category has a value of ${feeling.physic.value}
    The emotion category has a value of ${feeling.emotion.value}
    The economy category has a value of ${feeling.economy.value}
    The social category has a value of ${feeling.social.value}
    `
  })
  const mediaId = response.id;

  await masto.v1.statuses.create({
    status: `#HIFT`,
    visibility: "public",
    mediaIds:[mediaId]
  });
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
    <h3 class="col-lg-12 col-md-12 col-sm-12 px-0">
        {{(instance.getUser()||{}).url}}
    </h3>
    <div class="col-lg-4 col-md-12 col-sm-12 px-0">
      <FeelingForm @save="publishFeeling" v-model="feeling" @logoff="logoff"/>
    </div>
    <div class="col-lg-4 col-md-12 col-sm-12 px-0">
      <FeelingChart v-model="feeling" ref="chartChild"/>
    </div>
  </div>
</template>
