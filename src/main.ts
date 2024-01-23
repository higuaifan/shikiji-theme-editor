import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createMUI } from 'shuimo-ui';
import { createPinia } from 'pinia';

createApp(App)
  .use(createMUI({ disableWebComponent:[] }))
  .use(createPinia())
  .mount('#app')
