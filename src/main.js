import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from '@/router'
import '@/assets/styles/base.css'
import '@/assets/styles/main.css'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
 
library.add(fas);
 


const app = createApp(App)

app.use(ElementPlus)

app.use(router)

app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app')

