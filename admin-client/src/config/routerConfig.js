import router from '../router';
import store from '../store';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
const routerConfig = () => {
  router.beforeEach((to, from, next) => {
    NProgress.start()
    next()
    let historyList = store.state.historyList
    let title = to.meta.title || to.meta.routerName
    let name = to.name
    let withoutRouters = ['login', 'register']
    if (withoutRouters.indexOf(name) === -1) {
      historyList.push({
        name,
        routerName: title,
      })
      store.commit('setHistoryList', historyList)
    }

    if (title) {
      document.title = title
    } else {
      document.title = '后台管理系统'
    }
    // 判断该路由是否需要登录权限
    if (to.meta.requireAuth) {
      let token = store.state.token
      if (token) next()
      else next({ path: `./login` })
    } else {
      next();
    }
  })

  router.afterEach(() => {
    NProgress.done()
    NProgress.remove();
  })
}
export default routerConfig
