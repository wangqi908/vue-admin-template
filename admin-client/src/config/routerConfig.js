import router from '../router'
import store from '../store';
const routerConfig = () => {
  router.beforeEach((to, from, next) => {
    // 页面title
    if (to.meta.title) {
      document.title = to.meta.title
    } else {
      document.title = '后台管理系统'
    }
    // 判断该路由是否需要登录权限
    if (to.meta.requireAuth) {
      let userInfo = store.state.userInfo
      if (userInfo) {
        let { token } = userInfo
        if (token) next()
        else next({ path: `./login` })
      }
    }
    next();
  })
}
export default routerConfig