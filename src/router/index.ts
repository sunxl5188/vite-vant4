import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: defineAsyncComponent(
      () => import(/* webpackPrefetch: true */ '@/view/home/index.vue')
    )
  },
  {
    path: '/stomp',
    name: 'Stomp',
    component: defineAsyncComponent(
      () => import(/* webpackPrefetch: true */ '@/view/stomp/index.vue')
    )
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
