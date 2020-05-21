<template>
  <div id="echarts" style="width: 100%;height:300px;"></div>
</template>

<script>
import echarts from 'echarts'
// let echarts = require('echarts/lib/echarts')
// require('echarts/lib/chart/scatter')
export default {
  methods: {
    initData() {
      let myChart = echarts.init(document.getElementById('echarts'), 'macarons')
      let option = (option = {
        xAxis: {},
        yAxis: {},
        series: [
          {
            symbolSize: 20,
            data: [
              [10.0, 8.04],
              [8.0, 6.95],
              [13.0, 7.58],
              [9.0, 8.81],
              [11.0, 8.33],
              [14.0, 9.96],
              [6.0, 7.24],
              [4.0, 4.26],
              [12.0, 10.84],
              [7.0, 4.82],
              [5.0, 5.68]
            ],
            type: 'scatter'
          }
        ]
      })

      myChart.setOption(option)
      window.addEventListener('resize', () => {
        myChart.resize()
      })
    }
  },
  mounted() {
    this.initData()
  }
}
</script>
