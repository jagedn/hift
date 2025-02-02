<template>
  <div class="form-card">
    <form @submit.prevent="submitForm">
      <div>
        <label for="instance">Instance:</label>
        <span class="error" v-if="errors.instance && !isInstanceValid">{{ errors.instance }}</span>
        <input type="text" id="instance" v-model="form.instance.value" @blur="validateField('instance')" />
      </div>
      <!-- Add more form fields with onBlur validation -->

      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, defineEmits } from 'vue';

const emits = defineEmits(['instanceValid']);

const form = {
  instance: ref(''),
};

const errors = ref({});

const isInstanceValid = computed(() => form.instance.value.trim() !== '');

const validateField = (field) => {
  if (field === 'instance' && !isInstanceValid.value) {
    errors.value.instance = 'instance is required.';
  }
};

const submitForm = () => {
  errors.value = {}; // Clear previous errors
  validateField('instance');
  if (Object.keys(errors.value).length === 0) { //if no errors are found
    // Validation passed, handle form submission
    console.log('Form submitted successfully!', form);
    emits('instanceValid', form.instance.value);
  } else {
    console.log('Form has validation errors. Please correct them.');
  }
};
</script>

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