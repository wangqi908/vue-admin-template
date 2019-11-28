import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate' //vuex数据持久化
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: "",
    userInfo: {},//用户信息
    isCollapse: false, //是否展开侧边栏
    clientWidth: 880, //触发伸缩侧边栏宽度
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
    // 上传进度
    setUploadProgress(state, payload = "") {
      state.uploadProgress = 0
      state.uploadProgress = payload;
    },
  },
  plugins: [createPersistedState()]
})