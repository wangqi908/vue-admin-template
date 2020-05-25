export default {
  namespaced: true,
  state: {
    isCollapse: '', //折叠菜单
    isShowDrawer: false, //抽屉
    isBigClient: false, //是否是大屏幕
    big: 1000, //大于1000显示展开菜单
    small: 600, //1000-600折叠菜单,低于600菜单放入抽屉
    menu: [],
    clientWidth: '' //窗口宽度
  },
  mutations: {
    // 侧边导航收缩控制
    setCollapse(state, payload) {
      state.isCollapse = payload
    },
    // 抽屉
    setDrawer(state, payload) {
      state.isShowDrawer = payload
    },
    // 设置窗口宽度
    setClientWidth(state, payload) {
      state.clientWidth = payload
    },
    // 设置是否是小屏幕
    setSmClient(state, payload) {
      state.isBigClient = payload
    },
    // 设置menu
    setMenu(state, payload = []) {
      state.menu = payload
    }
  }
}
