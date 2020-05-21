<template>
  <div id="scatter" style="width: 100%;height:300px;"></div>
</template>

<script>
import echarts from 'echarts'
// let echarts = require('echarts/lib/echarts')
// require('echarts/lib/chart/scatter')
export default {
  methods: {
    initData() {
      let scatterChart = echarts.init(
        document.getElementById('scatter'),
        'macarons'
      )
      let option = {
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
      }

      scatterChart.setOption(option)
      window.addEventListener('resize', () => {
        scatterChart.resize()
      })
    }
  },
  mounted() {
    this.initData()
  }
}
</script>
