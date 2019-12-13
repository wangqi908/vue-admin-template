import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate' //vuex数据持久化
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
      }
    ],//初始化菜单
    authRoutes: [
      {
        path: '/',
        name: 'content',
        redirect: 'index',
        component: () => import(/* webpackChunkName: "content" */ '@/views/Content.vue'),
        meta: {
          requireAuth: true,
          title: '首页',
          isMenu: true
        },
        children: [
          {
            path: 'index',
            name: 'index',
            component: () => import(/* webpackChunkName: "index" */ '@/views/index/Index.vue'),
            meta: {
              requireAuth: true,
              title: '首页',
              url: '/index',
              isMenu: true, //是否是菜单
            }
          },
          {
            path: 'echarts',
            name: 'echarts',
            component: () => import(/* webpackChunkName: "echarts" */ '@/views/echarts.vue'),
            meta: {
              requireAuth: true,
              title: 'echarts',
              url: '/echarts',
              isMenu: true
            }
          },
          {
            path: 'echartsBar',
            name: 'echartsBar',
            component: () => import(/* webpackChunkName: "echartsBar" */ '@/views/echartsBar.vue'),
            meta: {
              requireAuth: true,
              title: 'echartsBar',
              url: '/echartsBar',
              isMenu: true
            }
          },
          {
            path: 'map',
            name: 'map',
            component: () => import(/* webpackChunkName: "map" */ '@/views/map.vue'),
            meta: {
              requireAuth: true,
              title: '地图',
              url: '/map',
              isMenu: true
            }
          },
          {
            path: 'info',
            name: 'info',
            component: () => import(/* webpackChunkName: "user" */ '@/views/info/Info.vue'),
            meta: {
              requireAuth: true,
              title: '信息',
              url: '/info',
              icon: 'el-icon-s-home',
              isMenu: true
            },
            children: [
              {
                path: 'user',
                name: 'user',
                component: () => import(/* webpackChunkName: "user" */ '@/views/info/user/User.vue'),
                meta: {
                  requireAuth: true,
                  title: '用户管理',
                  url: '/info/user',
                  isMenu: true
                }
              },
              {
                path: 'role',
                name: 'role',
                component: () => import(/* webpackChunkName: "role" */ '@/views/info/role/Role.vue'),
                meta: {
                  requireAuth: true,
                  title: '角色管理',
                  url: '/info/role',
                  isMenu: true
                }
              },
              {
                path: 'uploadData',
                name: 'uploadData',
                component: () => import(/* webpackChunkName: "uploadData" */ '@/views/info/uploadData/UploadData.vue'),
                meta: {
                  requireAuth: true,
                  title: '数据上传',
                  url: '/info/uploadData',
                  isMenu: true
                }
              },
            ]
          },
        ]
      }
    ],//配置权限菜单
    menuList: [],//存放菜单数据
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
    }
  },
  plugins: [createPersistedState({
    reducer(val) {
      return {
        // 只储存state中的user
        token: val.token,
        userInfo: val.userInfo,
      }
    }
  })]
})