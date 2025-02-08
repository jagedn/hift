<script setup>
import {createRestAPIClient} from "masto";
import router from '@/router';
import {instanceStore} from '@/stores/instance';
import {feelingStore} from '@/stores/feeling';
import FeelingForm from '../components/FeelingForm.vue'
import FeelingChart from '../components/FeelingChart.vue'
import {ref} from "vue";

const instance = instanceStore();
if (!(instance.getUser() || {} ).accessToken) {
  router.push('login')
}

const topics = {
  a: "Physical",
  b: "Emotional",
  c: "Economy",
  d: "Social",
};

const feeling = {
  a: ref(0),
  b: ref(0),
  c: ref(0),
  d: ref(0),
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
        ${topics.a} (light red),
        ${topics.b} (light teal),
        ${topics.c} (light gray),
        and ${topics.d} (gold).
    The ${topics.a} category has a value of ${feeling.a.value}
    The ${topics.b} category has a value of ${feeling.b.value}
    The ${topics.c} category has a value of ${feeling.c.value}
    The ${topics.d} category has a value of ${feeling.d.value}
    `
  })
  const mediaId = response.id;

  await masto.v1.statuses.create({
    status: `#HIFT`,
    visibility: "public",
    mediaIds:[mediaId]
  });

  feelingStore().updateFeeling({
    a: feeling.a.value,
    b: feeling.b.value,
    c: feeling.c.value,
    d: feeling.d.value,
  });

  alert("Feeling published");
}

setTimeout(() => {
  const current = feelingStore().getFeeling();
  feeling.a.value = current.a;
  feeling.b.value = current.b;
  feeling.c.value = current.c;
  feeling.d.value = current.d;
}, 100);

</script>

<template>
  <div class="container row py-4 px-3 mx-auto">
    <h3 class="col-lg-12 col-md-12 col-sm-12 px-0">
        {{(instance.getUser()||{}).url}}
    </h3>
    <div class="col-lg-4 col-md-12 col-sm-12 px-0">
      <FeelingForm @save="publishFeeling" v-model="feeling" @logoff="logoff" :topics="topics"/>
    </div>
    <div class="col-lg-4 col-md-12 col-sm-12 px-0">
      <FeelingChart v-model="feeling" ref="chartChild" :topics="topics"/>
    </div>
  </div>
</template>
