import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackPrefetch: true */ '@/view/home/index.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () =>
      import(/* webpackPrefetch: true */ '@/view/about/index.vue')
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
