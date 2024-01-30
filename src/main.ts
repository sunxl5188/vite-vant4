import { createApp } from 'vue'
import App from './App.vue'
import './style.scss'
import dayjs from 'dayjs'




const app = createApp(App)


declare module 'vue' {
  export interface ComponentCustomProperties {
    $dayjs(date?: dayjs.ConfigType): dayjs.Dayjs
  }
}

app.config.globalProperties.$dayjs = dayjs


app.mount('#app')
