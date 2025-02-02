<script setup>
import {  defineEmits, defineModel } from 'vue';

defineModel('modelValue')

const emits = defineEmits(['save', "updated"]);

const updated = () => {
  emits('updated');
};

const submitForm = () => {
  emits('save');
};

emits('updated');
</script>

<template>
  <div class="form-card">
    <form @submit.prevent="submitForm">
      <div>
        <label for="physic" class="form-label">Physic</label>
        <input type="range" class="form-range" id="v"  @change="updated" v-model="modelValue.physic.value" min="1" max="5"/>
      </div>

      <div>
        <label for="emotion" class="form-label">Emotion</label>
        <input type="range" class="form-range" id="emotion"  @change="updated" v-model="modelValue.emotion.value" min="1" max="5"/>
      </div>

      <div>
        <label for="social" class="form-label">Social</label>
        <input type="range" class="form-range" id="social"  @change="updated" v-model="modelValue.social.value" min="1" max="5"/>
      </div>

      <div>
        <label for="economy" class="form-label">Economy</label>
        <input type="range" class="form-range" id="economy"  @change="updated" v-model="modelValue.economy.value" min="1" max="5"/>
      </div>

      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  </div>
</template>


<style scoped>
.form-card {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

label {
  display: block;
  margin-bottom: 8px;
}

input {
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;

  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.error {
  color: red;
  font-size: 12px;
  margin-top: 4px;
}
</style>