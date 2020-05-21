export default {
  namespaced: true,
  state: {
    xAxisData: [],
    barData1: [],
    barData2: []
  },
  mutations: {
    setBarData(state) {
      let barData1 = []
      let barData2 = []
      let xAxisData = []
      let num = Math.floor(Math.random() * 100)
      for (let i = 0; i < num; i++) {
        xAxisData.push('类目' + i)
        barData1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5)
        barData2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5)
      }
      state.barData1 = barData1
      state.barData2 = barData2
      state.xAxisData = xAxisData
    }
  }
}
