import router from '../router'
import store from '../store';

// import { permissionConfig } from '@/config'
const routerConfig = () => {
  router.beforeEach((to, from, next) => {
    // permissionConfig()
    // 页面title
    if (to.meta.title) {
      document.title = to.meta.title
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
}
export default routerConfig