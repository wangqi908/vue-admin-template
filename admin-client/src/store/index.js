// import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { userInfoReq } from '@/apis'
import { duplicateRemoval } from '@/utils'
import chartStore from './chartStore'
import menuStore from './menuStore'

export default new Vuex.Store({
  state: {
    pageSize: 8,
    token: '',
    userInfo: {},
    routes: [],
    permissions: [],
    historyList: []
  },
  mutations: {
    // 设置token
    setToken(state, payload = '') {
      state.token = payload
    },
    // 设置用户信息
    setUserInfo(state, payload = {}) {
      state.userInfo = payload
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
  modules: { chartStore, menuStore },
  plugins: [
    createPersistedState({
      reducer(val) {
        return {
          // 储存state
          token: val.token,
          userInfo: val.userInfo
        }
      }
    })
  ]
})
