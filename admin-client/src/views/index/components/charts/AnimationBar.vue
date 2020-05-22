<template>
  <div>
    <div id="animation" style="width: 100%;height:300px;"></div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import echarts from 'echarts'

export default {
  data() {
    return {
      myBarData1: [],
      myBarData2: [],
      myXAxisData: [],
      barChart: null
    }
  },
  methods: {
    ...mapMutations('chartStore', ['setBarData']),
    initChart() {
      let barChart = echarts.init(
        document.getElementById('animation'),
        'macarons'
      )
      this.barChart = barChart
      this.initData()
    },
    initData() {
      let { barData1, barData2, xAxisData, barChart } = this
      barChart.clear()
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
      if (this.isBigClient) {
        option.title = {
          text: '柱状图动画延迟'
        }
      } else {
        option.title = {}
      }

      barChart.setOption(option)
      window.addEventListener('resize', () => {
        barChart.resize()
      })
    }
  },
  created() {
    this.setBarData()
  },
  mounted() {
    this.initChart()
  },
  computed: {
    ...mapState('chartStore', ['barData1', 'barData2', 'xAxisData']),
    ...mapState('menuStore', ['isBigClient'])
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
