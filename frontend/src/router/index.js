import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/home',
    component: () => import(/* webpackChunkName: "main" */ '../views/Home.vue')
  },
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "main" */ '../views/Auth/Login.vue')
  },
  {
    path: '/signup',
    component: () => import(/* webpackChunkName: "main" */ '../views/Auth/SignUp.vue')
  },
  {
    path: '/forgot',
    component: () => import(/* webpackChunkName: "main" */ '../views/Auth/Forgot.vue')
  },
  {
    path: '/password/reset/:token',
    component: () => import(/* webpackChunkName: "main" */ '../views/Auth/PasswordReset.vue')
  },
  {
    path: '/catalog',
    component: () => import(/* webpackChunkName: "catalog" */ '../views/Catalog.vue')
  },
  {
    path: '/anime/:slug',
    component: () => import(/* webpackChunkName: "catalog" */ '../views/MediaPage.vue')
  },
  {
    path: '/profile',
    component: () => import(/* webpackChunkName: "profile" */ '../views/Profile.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
