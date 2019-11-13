import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 多次点击相同路径报错处理
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/Login.vue'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/test',
    name: 'test',
    component: () => import(/* webpackChunkName: "test" */ '@/views/Test.vue'),
    meta: {
      title: 'test'
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "register" */ '@/views/Register.vue'),
    meta: {
      title: '注册'
    }
  },
  {
    path: '/',
    name: 'content',
    redirect: 'index',
    component: () => import(/* webpackChunkName: "content" */ '../views/Content.vue'),
    meta: {
      requireAuth: true,
      title: '首页'
    },
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import(/* webpackChunkName: "index" */ '../views/index/Index.vue'),
        meta: {
          requireAuth: true,
          title: '首页'
        }
      },
      {
        path: 'info/user',
        name: 'user',
        component: () => import(/* webpackChunkName: "user" */ '../views/info/user/User.vue'),
        meta: {
          requireAuth: true,
          title: '用户管理'
        }
      },
    ]
  }
]

const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

export default router
