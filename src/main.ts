import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createMUI } from 'shuimo-ui';

createApp(App)
  .use(createMUI({
    disableWebComponent:['MBorder']
  }))
  .mount('#app')
