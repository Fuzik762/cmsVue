import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    meta: {layout: 'auth'},
    component: () => import('../views/Login.vue')
  },
  {
    path: '/tasks',
    name: 'tasks',
    meta: {layout: 'main'},
    component: () => import('../views/Tasks.vue')
  }, 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
