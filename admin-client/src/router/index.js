// import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import { routesConfig } from '@/router/config'
routesConfig()

// Vue.use(VueRouter)
// 多次点击相同路径报错处理
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}
const router = new VueRouter({
  routes: store.state.routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || '管理中心'
  if (to.meta.requireAuth) {
    let token = store.state.token
    if (token) {
      let historyList = store.state.historyList
      let title = to.meta.title || to.meta.routerName
      let name = to.name
      console.log(name)
      let withoutRouters = ['login', 'register']
      if (withoutRouters.indexOf(name) === -1) {
        historyList.push({
          name,
          routerName: title
        })
        store.commit('setHistoryList', historyList)
      }
      next()
    } else {
      next({ path: `/login?re=${decodeURIComponent(to.fullPath)}` })
    }
  } else {
    next()
  }
})

export default router
