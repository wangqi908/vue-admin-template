<template>
  <div>
    <div id="animation-bar" style="width: 100%;height:300px;"></div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import echarts from 'echarts'
// let echarts = require('echarts/lib/echarts')
// require('echarts/lib/chart/bar')
// // // 引入提示框和标题组件
// require('echarts/lib/component/tooltip')
// require('echarts/lib/component/title')
// require('echarts/lib/component/legend')
// require('echarts/lib/component/toolbox')
export default {
  data() {
    return {
      myBarData1: [],
      myBarData2: [],
      myXAxisData: []
    }
  },
  methods: {
    ...mapMutations('charts', ['setBarData']),
    initData() {
      let myChart = echarts.init(
        document.getElementById('animation-bar'),
        'macarons'
      )
      let { barData1, barData2, xAxisData } = this
      myChart.clear()
      let option = {
        title: {
          text: '柱状图动画延迟'
        },
        legend: {
          data: ['bar', 'bar2']
        },
        toolbox: {
          // y: 'bottom',
          feature: {
            magicType: {
              type: ['stack', 'tiled']
            },
            dataView: {},
            saveAsImage: {
              pixelRatio: 2
            }
          }
        },
        tooltip: {},
        xAxis: {
          data: xAxisData,
          splitLine: {
            show: false
          }
        },
        yAxis: {},
        series: [
          {
            name: 'bar',
            type: 'bar',
            data: barData1,
            animationDelay: function(idx) {
              return idx * 10
            }
          },
          {
            name: 'bar2',
            type: 'bar',
            data: barData2,
            animationDelay: function(idx) {
              return idx * 10 + 100
            }
          }
        ],
        animationEasing: 'elasticOut',
        animationDelayUpdate: function(idx) {
          return idx * 5
        }
      }

      myChart.setOption(option)
      window.addEventListener('resize', () => {
        myChart.resize()
      })
    }
  },
  created() {
    this.setBarData()
  },
  mounted() {
    this.initData()
  },
  computed: {
    ...mapState('charts', ['barData1', 'barData2', 'xAxisData'])
  },
  watch: {
    xAxisData: {
      deep: true,
      handler() {
        this.initData()
      }
    }
  }
}
</script>
