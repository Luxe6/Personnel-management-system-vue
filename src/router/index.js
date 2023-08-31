import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: HomeView
  // },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }

  {
    path:'/',
    component: () => import('../views/Login')
  },
  {
    path: '/Login',
    name: 'login',
    component: () => import('../views/Login')
  },
  {
    path: '/Layout',
    name: 'layout',
    component: () => import('../components/Layout'),
    children:[
      {
        path:'user',
        component:() => import('../views/User')
      },
      {
        path:'employee',
        component:() => import('../views/Employee')
      },
      {
        path:'department',
        component:() => import('../views/Department')
      },
      {
        path:'position',
        component:() => import('../views/Position')
      },
      {
        path:'title',
        component:() => import('../views/Title')
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
