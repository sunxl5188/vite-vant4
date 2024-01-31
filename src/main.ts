import { createApp } from 'vue'
import App from './App.vue'
import XlVant4 from './index'
import dayjs from '@/utils/dayjs'
import './style.scss'

const app = createApp(App)

app.use(XlVant4)
app.use(dayjs)
app.mount('#app')
