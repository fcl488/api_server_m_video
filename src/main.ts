import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/index'
import '@/assets/style/reset.scss'
import pinia from '@/store'


const app = createApp(App)
app.use(router)
app.use(pinia)
app.mount('#app')
