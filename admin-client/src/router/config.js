import { filterMenu, filterRoutes } from '@/utils'
import store from '@/store'
import router, { resetRouter } from '@/router'

/* 
notMenu: true //不是菜单
modulePath: '/inventory' //属于哪个模块,对应的菜单高亮
out: true //布局以外的页面
requireAuth: true //需求token验证
*/
const menuJson = [
  {
    path: '/',
    redirect: '/index',
    type: 'redirect'
  },
  {
    title: '登录',
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/login/login'),
    out: true, //布局以外的页面
    meta: { title: '管理系统登录' }
  },
  {
    path: '*',
    redirect: '/404',
    type: 'notFound'
  },
  {
    title: 'notFound',
    path: '/404',
    name: 'notFound',
    component: () => import(/* webpackChunkName: "notFound" */ '@/views/error/notFound'),
    out: true,
    meta: { title: 'notFound' }
  },
  {
    title: '注册',
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "register" */ '@/views/register/register'),
    out: true,
    meta: { title: '管理系统注册' }
  },
  {
    title: '首页',
    path: '/index',
    name: 'index',
    icon: 'el-icon-s-home',
    component: () => import(/* webpackChunkName: "index" */ '@/views/index/index'),
    meta: { requireAuth: true, title: '管理系统' }
  },
  {
    path: '/test',
    name: 'test',
    notMenu: true,
    component: () => import(/* webpackChunkName: "test" */ '@/views/test'),
    meta: { requireAuth: true, title: 'test' }
  },
  {
    component: () => import(/* webpackChunkName: "layout" */ '@/components/layout/Layout'),
    type: 'layout',
    path: '/',
    notMenu: true,
    children: []
  },
  {
    title: '工具',
    path: '/tools',
    name: 'tools',
    icon: 'el-icon-suitcase',
    component: () => import(/* webpackChunkName: "tools" */ '@/views/tools/tools'),
    children: [
      {
        title: '编辑器',
        path: 'editor',
        name: 'editor',
        component: () => import(/* webpackChunkName: "editor" */ '@/views/tools/editor/editor'),
        meta: { requireAuth: true, title: '编辑器' }
      },
      {
        title: '粘贴板',
        path: 'clipboard',
        name: 'clipboard',
        component: () => import(/* webpackChunkName: "clipboard" */ '@/views/tools/clipboard/clipboard'),
        meta: { requireAuth: true, title: '粘贴板' }
      },
      {
        title: '生成图片',
        path: 'canvas2pic',
        name: 'canvas2pic',
        component: () => import(/* webpackChunkName: "canvas2pic" */ '@/views/tools/canvas2pic/canvas2pic'),
        meta: { requireAuth: true, title: '生成图片' }
      },
      {
        title: '悬浮固定',
        path: 'sticky',
        name: 'sticky',
        component: () => import(/* webpackChunkName: "sticky" */ '@/views/tools/sticky/sticky'),
        meta: { requireAuth: true, title: '悬浮固定' }
      },
      {
        title: '国际化',
        path: 'languages',
        name: 'languages',
        component: () => import(/* webpackChunkName: "languages" */ '@/views/tools/languages/languages'),
        meta: { requireAuth: true, title: '国际化' }
      },
      {
        title: '文字识别',
        path: 'ocr',
        name: 'ocr',
        component: () => import(/* webpackChunkName: "ocr" */ '@/views/tools/ocr/ocr'),
        meta: { requireAuth: true, title: '文字识别' }
      },
      {
        title: '头像上传',
        path: 'upload',
        name: 'upload',
        component: () => import(/* webpackChunkName: "upload" */ '@/views/tools/upload/upload'),
        meta: { requireAuth: true, title: '头像上传' }
      },
      {
        title: '地图',
        path: 'map',
        name: 'map',
        component: () => import(/* webpackChunkName: "map" */ '@/views/tools/map/map'),
        meta: { requireAuth: true, title: '地图' }
      },
      {
        title: '权限测试',
        path: 'permission',
        name: 'permission',
        component: () => import(/* webpackChunkName: "permission" */ '@/views/tools/permission/permission'),
        meta: { requireAuth: true, title: '权限测试' }
      }
    ]
  },
  {
    title: 'Excel',
    path: '/excel',
    icon: 'el-icon-files',
    name: 'excel',
    component: () => import(/* webpackChunkName: "excel" */ '@/views/excel/excel'),
    children: [
      {
        title: '导出',
        path: 'out',
        name: 'out',
        component: () => import(/* webpackChunkName: "out" */ '@/views/excel/out'),
        meta: { requireAuth: true, title: 'Excel导出' }
      },
      {
        title: '导入',
        path: 'in',
        name: 'in',
        component: () => import(/* webpackChunkName: "in" */ '@/views/excel/in'),
        meta: { requireAuth: true, title: 'Excel导入' }
      }
    ]
  },
  {
    title: '嵌套',
    path: '/nested',
    icon: 'el-icon-copy-document',
    name: 'nested',
    component: () => import(/* webpackChunkName: "nested" */ '@/views/nested/nested'),
    children: [
      {
        title: 'nested1',
        path: 'nested1',
        name: 'nested1',
        component: () => import(/* webpackChunkName: "nested1" */ '@/views/nested/nested1.vue'),
        meta: { requireAuth: true, title: 'nested1' },
        children: [
          {
            title: 'nested1-1',
            path: 'nested1-1',
            name: 'nested1-1',
            component: () => import(/* webpackChunkName: "nested1-1" */ '@/views/nested/nested1-1'),
            meta: { requireAuth: true, title: 'nested1-1' }
          },
          {
            title: 'nested1-1-view',
            path: 'nested1-1/view/:id?/:type?',
            name: 'nested1-1-view',
            notMenu: true,
            component: () => import(/* webpackChunkName: "nested1-1-view" */ '@/views/nested/nested1-1-view'),
            meta: {
              requireAuth: true,
              title: 'nested1-1-view',
              parentName: 'nested1-1',
              breadcrumb: [{ title: 'nested1' }, { title: 'nested1-1' }, { title: 'nested1-1-view' }] //面包屑
            }
          },
          {
            title: 'nested1-2',
            path: 'nested1-2',
            name: 'nested1-2',
            component: () => import(/* webpackChunkName: "nested1-2" */ '@/views/nested/nested1-2'),
            meta: { requireAuth: true, title: 'nested1-2' }
          }
        ]
      },
      {
        title: 'nested2',
        path: 'nested2',
        name: 'nested2',
        component: () => import(/* webpackChunkName: "nested2" */ '@/views/nested/nested2.vue'),
        meta: { requireAuth: true, title: 'nested2' },
        children: [
          {
            title: 'nested2-1',
            path: 'nested2-1',
            name: 'nested2-1',
            component: () => import(/* webpackChunkName: "nested2-1" */ '@/views/nested/nested2-1'),
            meta: { requireAuth: true, title: 'nested2-1' }
          },
          {
            title: 'nested2-2',
            path: 'nested2-2',
            name: 'nested2-2',
            component: () => import(/* webpackChunkName: "nested2-2" */ '@/views/nested/nested2-2'),
            meta: { requireAuth: true, title: 'nested2-2' }
          }
        ]
      }
    ]
  },
  {
    title: '系统',
    path: '/sys',
    name: 'sys',
    icon: 'el-icon-setting',
    component: () => import(/* webpackChunkName: "sys" */ '@/views/sys/sys'),
    children: [
      {
        title: '用户',
        path: 'user',
        name: 'user',
        component: () => import(/* webpackChunkName: "user" */ '@/views/sys/user/user'),
        meta: { requireAuth: true, title: '用户管理' }
      },
      {
        title: '权限',
        path: 'role',
        name: 'role',
        component: () => import(/* webpackChunkName: "role" */ '@/views/sys/role/role'),
        meta: { requireAuth: true, title: '权限管理' }
      }
    ]
  }
]

export const routesConfig = () => {
  let permissions = store.state.userInfo.permission || []

  const roleNames = permissions.map(ele => ele.role_name)

  let roleArr = ['test', 'index', 'map', ...roleNames]

  roleArr = [...new Set(roleArr)]

  let menu = filterMenu(menuJson, roleArr, true)

  let routers = filterRoutes(menuJson, filterMenu(menuJson, roleArr, false))

  if (router) {
    resetRouter()
    router.addRoutes(routers)
  }
  store.commit('setMenu', menu)
  store.commit('setRoutes', routers)
  store.commit('setPermissions', roleArr)
}
