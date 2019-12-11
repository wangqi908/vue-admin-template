import router from '../router'
import store from '../store';
const routerConfig = () => {

  let userInfo = {
    roles: ['content', 'index', 'echarts', 'echartsBar']
  }

  let authRoutes = [
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
            title: '首页',
            isMenu: true //是否是菜单
          }
        },
        {
          path: 'echarts',
          name: 'echarts',
          component: () => import(/* webpackChunkName: "echarts" */ '../views/echarts.vue'),
          meta: {
            requireAuth: true,
            title: 'echarts',
            isMenu: true
          }
        },
        {
          path: 'echartsBar',
          name: 'echartsBar',
          component: () => import(/* webpackChunkName: "echartsBar" */ '../views/echartsBar.vue'),
          meta: {
            requireAuth: true,
            title: 'echartsBar',
            isMenu: true
          }
        },
        {
          path: 'map',
          name: 'map',
          component: () => import(/* webpackChunkName: "map" */ '../views/map.vue'),
          meta: {
            requireAuth: true,
            title: 'map',
            isMenu: true
          }
        },
        {
          path: 'info/user',
          name: 'user',
          component: () => import(/* webpackChunkName: "user" */ '../views/info/user/User.vue'),
          meta: {
            requireAuth: true,
            title: '用户管理',
            isMenu: true
          }
        },
        {
          path: 'info/uploadData',
          name: 'uploadData',
          component: () => import(/* webpackChunkName: "uploadData" */ '../views/info/uploadData/UploadData.vue'),
          meta: {
            requireAuth: true,
            title: '数据上传',
            isMenu: true
          }
        },
      ]
    }
  ]


  // 根据权限筛选路由
  const filterRoutes = (authRoutes = []) => {
  let arr = []
  let { roles } = userInfo
    authRoutes.forEach(ele => {
      if (ele.children) {
        ele.children = filterRoutes(ele.children)
      }
      roles.forEach(item => {
        if (ele.name === item) {
          arr.push(ele)
        }
      })
    })
    return arr
  }

  // 根据权限筛选路由
  const filterMenu = (list = []) => {
    return list.filter(ele => {
      if (ele.children) {
        ele.children.forEach(i => {
          i.path = ele.path + '/' + i.path
        })
        ele.children = filterMenu(ele.children)
      }
      return ele.meta && ele.meta.isMenu
    })
  }


  let authRoutesByRoles = filterRoutes(authRoutes)//根据权限得到的路由
  let defaultRoutes = store.state.defaultRoutes//初始化的路由
  // 动态添加路由
  router.addRoutes(authRoutesByRoles)
  let allRoutes = JSON.parse(JSON.stringify([...defaultRoutes, ...authRoutesByRoles]))//全部路由树
  let menuList = filterMenu(allRoutes)
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