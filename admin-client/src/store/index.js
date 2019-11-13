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
    clientWidth: 880 //触发伸缩侧边栏宽度
  },
  mutations: {
    addNum(state, payload = 1) {
      state.num += payload
    },
    setToken(state, payload = "") {
      state.token = payload
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
    getCollapse(state, pay = false) {
      state.isCollapse = pay;
    },
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
