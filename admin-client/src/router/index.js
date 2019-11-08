import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    redirect: 'index',
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/Login.vue'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/index',
    name: 'index',
    component: () => import(/* webpackChunkName: "index" */ '../views/index/Index.vue'),
    meta: {
      title: '首页'
    }
  },
]

const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

export default router
