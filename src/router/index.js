import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/components/auth/LoginView.vue'
import ResetPassword from '@/views/components/auth/ResetPasswordView.vue'
import AuthModal from '@/views/components/modal/AuthModal'
import StatusView from '@/views/components/status/StatusView'
import VerifyView from '@/views/components/status/VerifyView'

import AdminView from '@/views/AdminView'
import PositionsView from '@/views/components/admin/PositionsView'
import Dashboard from '@/views/components/admin/Dashboard'
import PartylistView from '@/views/components/admin/PartyListView'
import CandidatesView from '@/views/components/admin/CandidatesView'
import SettingsView from '@/views/components/admin/SettingsView'
import ElectionView from '@/views/components/election/ElectionView'

import ResultView from '@/views/ResultView'
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
    path: '/verify/',
    name : 'verify',

    component:VerifyView ,
  },
  {
    path: '/admin',
    name : 'admin',
    component:AdminView ,
    redirect : {name: 'dashboard'},
    children:[
      {
        path: 'dashboard',
        name : 'dashboard',
        component:Dashboard ,
      },
      {
        path: 'positions',
        name : 'positions',
    
        component:PositionsView ,
      },
      {
        path: 'partylist',
        name : 'partylist',
    
        component:PartylistView ,
      },
      {
        path: 'candidates',
        name : 'candidates',
    
        component:CandidatesView ,
      },
      {
        path: 'settings',
        name : 'settings',
    
        component:SettingsView ,
      },

    

    ],

 
  },
  {
    path: '/vote',
    name: 'vote',
    component: ElectionView
  },

  

  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
   {
    path: '/result',
    name: 'result',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: ResultView
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/status'
  }
  
  

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
