import router from '../router'
import store from '../store';
const permissionConfig = () => {
  
  const Layout = () => import(/* webpackChunkName: "Layout" */ '@/components/layout/Index.vue')
  let defaultRoutes = store.state.defaultRoutes //初始化的路由
  let rolesNameArr = []
  let { userInfo,  authRoutes } = store.state
 

  if (userInfo.roles) {
    userInfo.roles.forEach(ele => {
      ele.forEach(i => {
        if (rolesNameArr.indexOf(i.role_name) == -1) rolesNameArr.push(i.role_name)
      })
    })
  }

  // 根据权限筛选路由
  const filterRoutes = (authRoutes = []) => {
    let arr = []
    authRoutes.forEach(ele => {
      if (ele.children && ele.meta.hasSubMenu) ele.children = filterRoutes(ele.children)
      rolesNameArr.forEach(item => {
        if (ele.meta.name === item) arr.push(ele)
      })
    })
    return arr
  }

  // 根据权限筛选路由
  const filterMenu = (list = []) => {
    return list.filter(ele => {
      if (ele.children && ele.hasSubMenu) ele.children = filterMenu(ele.children)
      return ele.meta && ele.meta.isMenu
    })
  }

  let authRoutesByRoles = filterRoutes(authRoutes)//根据权限得到的路由
  // 动态添加路由
  let allRoutes = [...defaultRoutes, ...authRoutesByRoles]//全部路由树
  router.addRoutes(authRoutesByRoles)

  store.commit('setMenuList', filterMenu(allRoutes))
  store.commit('setAuthRouteList', authRoutesByRoles)

}

export default permissionConfig
