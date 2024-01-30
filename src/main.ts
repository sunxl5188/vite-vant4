import { createApp } from 'vue'
import App from './App.vue'
import dayjs from './utils/dayjs'
import XlVant from './index'
import './style.scss'

const app = createApp(App)

app.use(dayjs)
app.use(XlVant)

app.mount('#app')
