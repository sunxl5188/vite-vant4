import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* @vite-preload */ '@/view/home/index.vue')
  },
  {
    path: '/form',
    name: 'Form',
    component: () => import('@/view/form/index.vue')
  },
  {
    path: '/list',
    name: 'List',
    component: () => import('@/view/list/index.vue')
  },
  {
    path: '/stomp',
    name: 'Stomp',
    component: () => import('@/view/stomp/index.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/view/login/index.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/view/login/register.vue')
  },
  {
    path: '/protocol/:id?',
    name: 'Protocol',
    component: () => import('@/view/protocol/index.vue')
  }
]

// 404页面路由
routes.push({
  path: '/:pathMatch(.*)*',
  name: 'NotFound',
  component: () => import('@/view/Notfound.vue')
})

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE),
  routes
})

export default router
