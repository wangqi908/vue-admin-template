import router from '../router'
import store from '../store';
const routerConfig = () => {

  let userInfo = {
    roles: ['content', 'index', 'echarts', 'echartsBar', 'info', 'map', 'user', 'uploadData']
  }


  // 根据权限筛选路由
  const filterRoutes = (authRoutes = []) => {
    let arr = []
    let { roles } = userInfo
    authRoutes.forEach(ele => {
      if (ele.children) ele.children = filterRoutes(ele.children)
      roles.forEach(item => {
        if (ele.name === item) arr.push(ele)
      })
    })
    return arr
  }

  // 根据权限筛选路由
  const filterMenu = (list = []) => {
    return list.filter(ele => {
      if (ele.children) ele.children = filterMenu(ele.children)
      return ele.meta && ele.meta.isMenu
    })
  }

  let defaultRoutes = store.state.defaultRoutes//初始化的路由
  let authRoutes = store.state.authRoutes//配置权限菜单

  let authRoutesByRoles = filterRoutes(authRoutes)//根据权限得到的路由

  // 动态添加路由
  router.addRoutes(authRoutesByRoles)
  let allRoutes = JSON.parse(JSON.stringify([...defaultRoutes, ...authRoutesByRoles]))//全部路由树


  let menuList = filterMenu(allRoutes)[0].children

  store.commit('setMenuList', menuList)

  router.beforeEach((to, from, next) => {
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