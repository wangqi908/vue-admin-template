import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    num: 0,
    token: "",
    userInfo: {},//用户信息
    isCollapse: false, //是否展开侧边栏
    clientWidth: 880, //触发伸缩侧边栏宽度
    uploadProgress: 0 //上传进度
  },
  mutations: {
    addNum(state, payload = 1) {
      state.num += payload
    },
    setToken(state, payload = "") {
      state.token = "Bearer " + payload
    },
    removeToken(state) {
      state.token = ""
    },
    setUserInfo(state, payload = {}) {
      state.userInfo = payload
    },
    removeUserInfo(state) {
      state.userInfo = {}
    },
    getCollapse(state, payload = false) {
      state.isCollapse = payload;
    },
    setUploadProgress(state, payload = "") {
      state.uploadProgress = 0
      state.uploadProgress = payload;
    },
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState()]
})