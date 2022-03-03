import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {layout: 'main'},
    component: () => import('../views/Home.vue')
  },
  {
    path: '/login',
    name: 'login',
    meta: {layout: 'auth'},
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    meta: {layout: 'auth'},
    component: () => import('../views/Register.vue')
  },
  {
    path: '/tasks',
    name: 'tasks',
    meta: {layout: 'main'},
    component: () => import('../views/Tasks.vue')
  }, 
  {
    path: '/finance',
    name: 'finance',
    meta: {layout: 'main'},
    component: () => import('../views/Finance.vue')
  }, 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
