'use strict'
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}
const isProduction = process.env.NODE_ENV === 'production';
const cdn = {
  css: ['https://cdn.bootcss.com/element-ui/2.12.0/theme-chalk/index.css'],
  js: [
    'https://cdn.bootcss.com/vue/2.6.10/vue.js',
    'https://cdn.bootcss.com/axios/0.19.0/axios.js',
    'https://cdn.bootcss.com/vuex/3.1.1/vuex.js',
    'https://cdn.bootcss.com/vue-router/3.1.3/vue-router.js',
    'https://cdn.bootcss.com/element-ui/2.12.0/index.js'
  ]
}

module.exports = {
  publicPath: './',
  outputDir: 'app',
  assetsDir: 'static',
  productionSourceMap: false,
  devServer: {
    port: 8888,  // 端口
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
  },
  configureWebpack: config => {

    config.resolve = {
      // 设置别名
      alias: {
        '@': resolve('src'),
        '@c': resolve('./src/components'),
        '@apis': resolve('./src/apis/index.js')
      }
    }

    // 公用代码提取，使用cdn加载
    // 用cdn方式引入
    config.externals = {
      'vue': 'Vue',
      'vuex': 'Vuex',
      'vue-router': 'VueRouter',
      'axios': 'axios',
      'element-ui': 'ELEMENT',
    }

  },
  chainWebpack: config => {
    config.plugins.delete('preload')  // 移除 prefetch 插件
    config.plugins.delete('prefetch')  // 移除 preload 插件

    // 生产环境注入cdn
    config.plugin('html')
      .tap(args => {
        args[0].cdn = cdn;
        return args;
      });

  }
}