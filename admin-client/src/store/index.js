// import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { userInfoReq } from '@/apis'
import { duplicateRemoval } from '@/utils'
// Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isCollapse: '',
    pageSize: 8,
    token: '',
    userInfo: {},
    propList: [],
    menu: [],
    routes: [],
    permissions: [],
    historyList: []
  },
  mutations: {
    // 侧边导航收缩控制
    setCollapse(state, payload) {
      state.isCollapse = payload
    },
    // 设置token
    setToken(state, payload = '') {
      state.token = payload
    },
    // 设置用户信息
    setUserInfo(state, payload = {}) {
      state.userInfo = payload
    },
    // 设置propList
    setPropList(state, payload = {}) {
      state.propList = payload
    },
    // 设置menu
    setMenu(state, payload = []) {
      state.menu = payload
    },
    // 设置Routes
    setRoutes(state, payload = []) {
      state.routes = payload
    },
    // 设置setPermissions
    setPermissions(state, payload = []) {
      state.permissions = payload
    },
    // 设置路由历史
    setHistoryList(state, payload = []) {
      state.historyList = duplicateRemoval(payload, 'name')
    }
  },
  actions: {
    getUserInfoAction({ commit }) {
      return new Promise(resolve => {
        userInfoReq().then(res => {
          if (res.data.code === 200) {
            let info = res.data.data
            commit('setUserInfo', info)
            resolve(info)
          }
        })
      })
    }
  },
  modules: {},
  plugins: [
    createPersistedState({
      reducer(val) {
        return {
          // 储存state
          token: val.token,
          userInfo: val.userInfo,
          propList: val.propList
        }
      }
    })
  ]
})
