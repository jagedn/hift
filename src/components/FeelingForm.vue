<script setup>
import {  defineEmits, defineModel } from 'vue';

defineModel('modelValue')
const props = defineProps(["topics"]);
const emits = defineEmits(['save', "updated"]);

const updated = () => {
  emits('updated');
};

const submitForm = () => {
  emits('save');
};

const logoff=()=>{
  emits('logoff');
};

emits('updated');
</script>

<template>
  <div class="form-card">
    <form @submit.prevent="submitForm">
      <div>
        <label for="a" class="form-label">{{props.topics.a}} ({{modelValue.a}}%)</label>
        <input type="range" class="form-range" id="a"  @change="updated" v-model="modelValue.a.value" min="1" :max="modelValue.max"/>
      </div>

      <div>
        <label for="b" class="form-label">{{props.topics.b}} ({{modelValue.b}}%)</label>
        <input type="range" class="form-range" id="b"  @change="updated" v-model="modelValue.b.value" min="1" :max="modelValue.max"/>
      </div>

      <div>
        <label for="c" class="form-label">{{props.topics.c}} ({{modelValue.c}}%)</label>
        <input type="range" class="form-range" id="c"  @change="updated" v-model="modelValue.c.value" min="1" :max="modelValue.max"/>
      </div>

      <div>
        <label for="d" class="form-label">{{props.topics.d}} ({{modelValue.d}}%)</label>
        <input type="range" class="form-range" id="d"  @change="updated" v-model="modelValue.d.value" min="1" :max="modelValue.max"/>
      </div>

      <div class="d-grid gap-2 d-md-flex justify-content-md-center">
        <button class="btn btn-primary  me-md-3" type="submit">Submit</button>
        <button type="button" class="btn btn-outline-danger" @click="logoff">Logout</button>
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