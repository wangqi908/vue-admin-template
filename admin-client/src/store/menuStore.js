export default {
  namespaced: true,
  state: {
    isCollapse: '',
    menu: []
  },
  mutations: {
    // 侧边导航收缩控制
    setCollapse(state, payload) {
      state.isCollapse = payload
    },
    // 设置menu
    setMenu(state, payload = []) {
      state.menu = payload
    }
  }
}
