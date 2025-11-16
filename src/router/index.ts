import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackPrefetch: true */ '@/view/home/index.vue')
  },
  {
    path: '/form',
    name: 'Form',
    component: () => import(/* webpackPrefetch: true */ '@/view/form/index.vue')
  },
  {
    path: '/stomp',
    name: 'Stomp',
    component: () =>
      import(/* webpackPrefetch: true */ '@/view/stomp/index.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE),
  routes
})

export default router
