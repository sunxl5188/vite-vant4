import { createApp } from 'vue'
import App from './App.vue'
import dayjs from './utils/dayjs'
import './style.scss'

const app = createApp(App)

app.use(dayjs)

app.mount('#app')
