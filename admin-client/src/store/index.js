import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    num: 0,
    userInfo: {}//用户信息
  },
  mutations: {
    addNum(state, payload = 1) {
      state.num += payload
    },
    setUserInfo(state, payload = {}) {
      state.userInfo = payload
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
