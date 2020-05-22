'use strict'
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const cdn = {
  css: ['https://cdn.bootcdn.net/ajax/libs/element-ui/2.13.2/theme-chalk/index.css'],
  js: [
    'https://cdn.bootcss.com/vue/2.6.10/vue.js',
    'https://cdn.bootcdn.net/ajax/libs/axios/0.19.2/axios.js',
    'https://cdn.bootcss.com/vuex/3.1.1/vuex.js',
    'https://cdn.bootcss.com/vue-router/3.1.3/vue-router.js',
    'https://cdn.bootcdn.net/ajax/libs/element-ui/2.13.2/index.js',
    'https://cdn.bootcdn.net/ajax/libs/tinymce/5.2.2/tinymce.min.js',
    'https://cdn.bootcdn.net/ajax/libs/echarts/4.7.0/echarts-en.common.js'
  ]
}

module.exports = {
  publicPath: './',
  outputDir: 'app',
  assetsDir: 'static',
  productionSourceMap: false,
  devServer: {
    port: 8889, // 端口
    open: true,
    proxy: {
      '/*': {
        target: 'http://192.168.10.106/api/',
        changeOrigin: true
      }
    }
  },
  configureWebpack: {
    // 公用代码提取，使用cdn加载
    // 用cdn方式引入
    externals: {
      vue: 'Vue',
      vuex: 'Vuex',
      'vue-router': 'VueRouter',
      axios: 'axios',
      'element-ui': 'ELEMENT',
      tinymce: 'tinymce',
      echarts: 'echarts'
    },

    plugins: [new BundleAnalyzerPlugin()]
  },
  chainWebpack: config => {
    config.plugins.delete('preload') // 移除 prefetch 插件
    config.plugins.delete('prefetch') // 移除 preload 插件

    // 生产环境注入cdn
    config.plugin('html').tap(args => {
      args[0].cdn = cdn
      args[0].title = '后台管理系统'
      return args
    })
  }
}
