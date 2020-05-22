// import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// Vue.use(VueRouter)
// 多次点击相同路径报错处理
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}

const createRouter = () =>
  new VueRouter({
    routes: []
  })

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // the relevant part
}

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || '管理中心'
  NProgress.start()
  let title = to.meta.title || to.meta.routerName
  let name = to.name

  if (to.meta.requireAuth) {
    let token = store.state.token

    // 记录路由历史
    let historyList = store.state.historyList

    let withoutRouters = ['login', 'register', 'notFound']
    if (withoutRouters.indexOf(name) === -1) {
      historyList.push({
        name,
        routerName: title
      })
      store.commit('setHistoryList', historyList)
    }

    if (token) {
      next()
    } else {
      next({ path: `/login?re=${decodeURIComponent(to.fullPath)}` })
    }
  } else {
    next()
  }
})

router.afterEach(() => {
  NProgress.done()
  NProgress.remove()
})

export default router
