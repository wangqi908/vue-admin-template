import router from '../router'
import store from '../store';
import { deepCopy } from '@/utils';
const permissionConfig = () => {

  let defaultRoutes = store.state.defaultRoutes //初始化的路由
  let rolesNames = ['tools', 'editor', 'clipboard', 'permission', 'sticky', 'uploadAvatar', 'nested', 'menu1', 'menu1-1', 'menu1-2'] //权限名称
  let { userInfo } = store.state
  let authRoutes = deepCopy(store.state.authRoutes)
  if (userInfo.roles) {
    userInfo.roles.forEach(ele => {
      ele.forEach(i => {
        if (rolesNames.indexOf(i.role_name) == -1) rolesNames.push(i.role_name)
      })
    })
  }

  // 根据权限筛选路由返回对应路由
  const filterRoutes = (authRoutes = []) => {
    let arr = []
    authRoutes.forEach(ele => {
      if (ele.children && ele.meta.hasSubMenu) {
        // ele.children = filterRoutes(ele.children)
        ele.children = filterRoutes(ele.children)
      }
      rolesNames.forEach(item => {
        if (ele.meta.name === item) arr.push(ele)
      })
    })
    return arr
  }



  // 根据权限筛选路由返回对应菜单
  const filterMenu = (list = []) => {
    return list.filter(ele => {
      if (ele.children && ele.hasSubMenu) ele.children = filterMenu(ele.children)
      return ele.meta && ele.meta.isMenu
    })
  }
  const setMenu = (menuList = []) => {
    let arr = [];
    menuList.forEach(ele => {
      let hasSubMenu = ele.meta.hasSubMenu;
      if (hasSubMenu) ele.children = setMenu(ele.children);
      arr.push({
        url: ele.meta.url,
        name: ele.meta.title,
        icon: ele.meta.icon || '',
        children: hasSubMenu ? ele.children : []
      });
    });
    return arr;
  };
  let authRoutesByRoles = filterRoutes(authRoutes)//根据权限得到的路由
  // 动态添加路由
  let allRoutes = deepCopy([...defaultRoutes, ...authRoutesByRoles])//全部路由树
  router.addRoutes(authRoutesByRoles)

  let menuList = setMenu(filterMenu(allRoutes));
  store.commit('setMenuList', menuList)
  store.commit('setRolesNames', rolesNames)
}

export default permissionConfig
