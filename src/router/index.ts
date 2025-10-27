import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/view/home/index.vue')
  },
  {
    path: '/stomp',
    name: 'Stomp',
    component: () => import('@/view/stomp/index.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
