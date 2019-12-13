import router from '../router'
import store from '../store';
const permissionConfig = () => {

  let defaultRoutes = store.state.defaultRoutes //初始化的路由
  let authRoutes = store.state.authRoutes //配置权限菜单
  let userInfo = store.state.userInfo //用户信息

  let rolesNameArr = ['content']
  if(userInfo.roles){
    
  userInfo.roles.forEach(ele => {
    ele.forEach(i => {

      if (rolesNameArr.indexOf(i.role_name) == -1) {
        rolesNameArr.push(i.role_name)
      }
    })
  })
  }

  // 根据权限筛选路由
  const filterRoutes = (authRoutes = []) => {
    let arr = []
    authRoutes.forEach(ele => {
      if (ele.children) ele.children = filterRoutes(ele.children)
      rolesNameArr.forEach(item => {
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

  let authRoutesByRoles = filterRoutes(authRoutes)//根据权限得到的路由
  // 动态添加路由
  router.addRoutes(authRoutesByRoles)
  let allRoutes = JSON.parse(JSON.stringify([...defaultRoutes, ...authRoutesByRoles]))//全部路由树

  let menuList = filterMenu(allRoutes)[0].children

  store.commit('setMenuList', menuList)

}
export default permissionConfig