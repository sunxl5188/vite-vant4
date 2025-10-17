import { createApp } from 'vue'
import App from './App.vue'
import '@/assets/styles/tailwindcss.css'
import '@/assets/styles/base.scss'
import i18n from './i18n'
import router from './router'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'
//------------------------------
import 'vant/es/toast/style'

const app = createApp(App)
const pinia = createPinia()
pinia.use(createPersistedState())

app.use(i18n)
app.use(router)
app.use(pinia)
app.mount('#app')
