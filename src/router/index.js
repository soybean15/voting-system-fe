import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/components/auth/LoginView.vue'
import ResetPassword from '@/views/components/auth/ResetPasswordView.vue'
import AuthModal from '@/views/components/modal/AuthModal'
import StatusView from '@/views/components/status/StatusView'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name : 'login',
 
    component:AuthModal ,
  },
  {
    path: '/register',
    name : 'register',

    component:AuthModal ,
  },
  {
    path: '/forgot-password',
    name : 'forgotPassword',
    component:AuthModal ,
  },
  {
    path: '/password-reset/:token',
    name : 'resetPassword',

    component:ResetPassword ,
  },
  {
    path: '/status/',
    name : 'status',

    component:StatusView ,
  },
  

  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
