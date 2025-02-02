import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from '../router'
import App from './App.vue'

// Import our custom CSS
import '../scss/styles.scss'

// Import only the Bootstrap components we need
import { Popover } from 'bootstrap';

const app = createApp(App)
    .use(createPinia())
    .use(router)
    .mount('#app')

// Create an example popover
document.querySelectorAll('[data-bs-toggle="popover"]')
  .forEach(popover => {
    new Popover(popover)
  })
