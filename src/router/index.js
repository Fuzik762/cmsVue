import { createRouter, createWebHistory } from 'vue-router'
import firebase from 'firebase/app'

const routes = [
  {
    path: '/:pathMatch(.*)*',
    redirect: '/tasks'
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
    meta: {layout: 'main', auth: true},
    component: () => import('../views/Tasks.vue')
  }, 
  {
    path: '/finance',
    name: 'finance',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/Finance.vue')
  }, 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser
  const requireAuth = to.matched.some(r => r.meta.auth)

  if(requireAuth && !currentUser) {
    next('/login?message=login')
  } else {
    next()
  }
})

export default router
