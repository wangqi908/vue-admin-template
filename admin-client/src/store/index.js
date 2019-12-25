import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate' //vuex数据持久化
import { userInfoReq } from "@apis";
import { resetRouter } from "@/router";
import { permissionConfig } from "@/config";
const Layout = () => import(/* webpackChunkName: "Layout" */ '@/components/layout/Index.vue')
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: "",
    userInfo: {},//用户信息
    isCollapse: false, //是否展开侧边栏
    isShowAside: false, //是否隐藏侧边栏
    defaultRoutes: [
      {
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "login" */ '@/views/login/Login.vue'),
        meta: {
          title: '登录'
        }
      },
      {
        path: '/test',
        name: 'test',
        component: () => import(/* webpackChunkName: "test" */ '@/views/Test.vue'),
        meta: {
          title: 'test'
        }
      },
      {
        path: '/register',
        name: 'register',
        component: () => import(/* webpackChunkName: "register" */ '@/views/register/Register.vue'),
        meta: {
          title: '注册'
        }
      },
      {
        path: '*',
        name: '404',
        component: () => import(/* webpackChunkName: "ErrPage" */ '@/views/ErrPage.vue'),
        meta: {
          title: '404'
        }
      },

      {
        path: '/',
        component: Layout,
        meta: {
          name: 'index',
          isMenu: true, //是否是菜单
          title: '首页',
          url: '/',
          icon: "el-icon-files"
        },
        children: [{
          path: '',
          name: 'index',
          component: () => import(/* webpackChunkName: "index" */ '@/views/index/Index.vue'),
          meta: {
            requireAuth: true,
            url: '/'
          },
        }]
      },

    ],//初始化菜单
    authRoutes: [
      {
        path: '/echarts',
        component: Layout,
        meta: {
          name: 'echarts',
          title: 'echarts',
          url: '/echarts',
          isMenu: true,
          icon: "el-icon-files"
        },
        children: [{
          path: '',
          name: 'echarts',
          component: () => import(/* webpackChunkName: "echarts" */ '@/views/echarts.vue')
        }]
      },
      {
        path: '/echartsBar',
        component: Layout,
        meta: {
          name: 'echartsBar',
          title: 'echartsBar',
          url: '/echartsBar',
          isMenu: true,
          icon: "el-icon-files"
        },
        children: [{
          path: '',
          name: 'echartsBar',
          component: () => import(/* webpackChunkName: "echartsBar" */ '@/views/echartsBar.vue'),
        }]
      },
      {
        path: '/map',
        component: Layout,
        meta: {
          name: 'map',
          title: '地图',
          url: '/map',
          isMenu: true,
          icon: "el-icon-files"
        },
        children: [{
          path: '',
          name: 'map',
          component: () => import(/* webpackChunkName: "map" */ '@/views/map.vue'),
        }]
      },
      {
        path: '/tools',
        component: Layout,
        name: 'tools',
        meta: {
          requireAuth: true,
          name: 'tools',
          title: '工具',
          url: '/tools',
          isMenu: true,
          hasSubMenu: true,
          icon: "el-icon-files"
        },
        children: [
          {
            path: 'permission',
            name: 'permission',
            component: () => import(/* webpackChunkName: "permission" */ '@/views/tools/permission/Permission.vue'),
            meta: {
              requireAuth: true,
              name: 'permission',
              title: '权限测试',
              url: '/tools/permission',
              isMenu: true,
              icon: "el-icon-files"
            }
          },
          {
            path: 'editor',
            name: 'editor',
            component: () => import(/* webpackChunkName: "editor" */ '@/views/tools/editor/Editor.vue'),
            meta: {
              requireAuth: true,
              name: 'editor',
              title: '富文本编辑器',
              url: '/tools/editor',
              isMenu: true,
              icon: "el-icon-files"
            }
          },
          {
            path: 'clipboard',
            name: 'clipboard',
            component: () => import(/* webpackChunkName: "clipboard" */ '@/views/tools/clipboard/Clipboard.vue'),
            meta: {
              requireAuth: true,
              name: 'clipboard',
              title: '粘贴板',
              url: '/tools/clipboard',
              isMenu: true,
              icon: "el-icon-files"
            }
          },
          {
            path: 'sticky',
            name: 'sticky',
            component: () => import(/* webpackChunkName: "sticky" */ '@/views/tools/sticky/Sticky.vue'),
            meta: {
              requireAuth: true,
              name: 'sticky',
              title: '悬浮固定',
              url: '/tools/sticky',
              isMenu: true,
              icon: "el-icon-files"
            }
          },
          {
            path: 'uploadAvatar',
            name: 'uploadAvatar',
            component: () => import(/* webpackChunkName: "uploadAvatar" */ '@/views/tools/uploadAvatar/UploadAvatar.vue'),
            meta: {
              requireAuth: true,
              name: 'uploadAvatar',
              title: '头像上传',
              url: '/tools/uploadAvatar',
              isMenu: true,
              icon: "el-icon-files"
            }
          },
        ]
      },
      {
        path: '/info',
        component: Layout,
        name: 'info',
        meta: {
          requireAuth: true,
          name: 'info',
          title: '信息管理',
          url: '/info',
          isMenu: true,
          hasSubMenu: true,
          icon: "el-icon-files"
        },
        children: [
          {
            path: 'user',
            name: 'user',
            component: () => import(/* webpackChunkName: "user" */ '@/views/info/user/User.vue'),
            meta: {
              requireAuth: true,
              name: 'user',
              title: '用户管理',
              url: '/info/user',
              isMenu: true,
              icon: "el-icon-files"
            }
          },
          {
            path: 'role',
            name: 'role',
            component: () => import(/* webpackChunkName: "role" */ '@/views/info/role/Role.vue'),
            meta: {
              requireAuth: true,
              name: 'role',
              title: '角色管理',
              url: '/info/role',
              isMenu: true,
              icon: "el-icon-files"
            }
          },
          {
            path: 'uploadData',
            name: 'uploadData',
            component: () => import(/* webpackChunkName: "uploadData" */ '@/views/info/uploadData/UploadData.vue'),
            meta: {
              requireAuth: true,
              name: 'uploadData',
              title: '数据上传',
              url: '/info/uploadData',
              isMenu: true,
              icon: "el-icon-files"
            }
          },
        ]
      },
      {
        path: '/nested',
        component: Layout,
        name: 'nested',
        meta: {
          requireAuth: true,
          name: 'nested',
          title: '菜单嵌套',
          url: '/nested',
          isMenu: true,
          hasSubMenu: true,
          icon: "el-icon-files"
        },
        children: [
          {
            path: 'menu1',
            name: 'menu1',
            component: () => import(/* webpackChunkName: "menu1" */ '@/views/nested/Menu1.vue'),
            meta: {
              requireAuth: true,
              name: 'menu1',
              title: '一级菜单',
              url: '/nested/menu1',
              isMenu: true,
              hasSubMenu: true,
              icon: "el-icon-files"
            },
            children: [
              {
                path: 'menu1-1',
                name: 'menu1-1',
                component: () => import(/* webpackChunkName: "menu1-1" */ '@/views/nested/Menu1-1.vue'),
                meta: {
                  requireAuth: true,
                  name: 'menu1-1',
                  title: '二级菜单1-1',
                  url: '/nested/menu1/menu1-1',
                  isMenu: true,
                  icon: "el-icon-files"
                }
              },
              {
                path: 'menu1-2',
                name: 'menu1-2',
                component: () => import(/* webpackChunkName: "menu1-2" */ '@/views/nested/Menu1-2.vue'),
                meta: {
                  requireAuth: true,
                  name: 'menu1-2',
                  title: '二级菜单1-2',
                  url: '/nested/menu1/menu1-2',
                  isMenu: true,
                  icon: "el-icon-files"
                }
              },

            ]
          },

        ]
      },
    ],//配置权限菜单
    menuList: [],//存放菜单数据
    rolesNames: [],//权限名称
    pageSize: 5,//分页每页显示条目个数
    clientWidth: 1280, //触发伸缩侧边栏宽度
    showAsideWidth: 580, //隐藏显示侧边栏宽度
    uploadProgress: 0 //上传进度
  },
  mutations: {
    // 设置token
    setToken(state, payload = "") {
      state.token = "Bearer " + payload
    },
    // 移除token
    removeToken(state) {
      state.token = ""
    },
    // 设置用户信息
    setUserInfo(state, payload = {}) {
      state.userInfo = payload
    },
    // 移除用户信息
    removeUserInfo(state) {
      state.userInfo = {}
    },
    // 折叠菜单
    getCollapse(state, payload = false) {
      state.isCollapse = payload;
    },
    // 隐藏菜单
    setShowAside(state, payload = false) {
      state.isShowAside = payload;
    },
    // 上传进度
    setUploadProgress(state, payload = "") {
      state.uploadProgress = 0
      state.uploadProgress = payload;
    },
    // 动态设置菜单
    setMenuList(state, payload = []) {
      state.menuList = payload
    },
    // 动态设置菜单
    setRolesNames(state, payload = []) {
      state.rolesNames = payload
    }
  },
  actions: {
    // 修改权限或角色时,同步修改路由,菜单跟着联动
    async resetRouterOnViewAsync({ commit }) {
      const res = await userInfoReq()
      if (res.data.code === 200) {
        let userInfo = res.data.data
        // console.log('resetRouterOnViewAsync', userInfo)
        commit('setUserInfo', userInfo)
        resetRouter()
        permissionConfig()
      }
    }
  },
  plugins: [createPersistedState({
    reducer(val) {
      return {
        // 储存state
        token: val.token,
        userInfo: val.userInfo
      }
    }
  })]
})