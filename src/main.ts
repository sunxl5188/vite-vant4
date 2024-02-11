import { createApp } from 'vue'
import App from './App.vue'
import XlVant4 from './index'
import dayjs from '@/utils/dayjs'
import './style.scss'
import 'vant/es/toast/style'
import 'vant/es/dialog/style'
import 'vant/es/notify/style'
import 'vant/es/image-preview/style'

const app = createApp(App)

app.use(XlVant4)
app.use(dayjs)
app.mount('#app')
