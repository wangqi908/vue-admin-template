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
    navList: [
      {
        name: "首页",
        icon: "el-icon-s-home",
        path: "/index",
        children: null
      },
      {
        name: "echarts",
        icon: "el-icon-s-home",
        path: "/echarts",
        children: null
      },
      {
        name: "echartsBar",
        icon: "el-icon-s-home",
        path: "/echartsBar",
        children: null
      },
      {
        name: "map",
        icon: "el-icon-s-home",
        path: "/map",
        children: null
      },
      {
        name: "信息",
        icon: "el-icon-menu",
        path: "/info",
        children: [
          {
            name: "用户管理",
            path: "/info/user"
          },
          {
            name: "数据上传",
            path: "/info/uploadData"
          }
        ]
      }
    ],
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
    ],
    menuList: [],//存放菜单数据
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