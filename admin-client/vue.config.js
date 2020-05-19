'use strict'
const isProduction = process.env.NODE_ENV === 'production'
let BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: './',
  outputDir: 'admin',
  assetsDir: 'static',
  productionSourceMap: false,
  devServer: {
    port: 8889, // 端口
    open: true,
    overlay: {
      warnings: false,
      errors: true
    }
  },
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = '售后管理系统'
      return args
    })
    // 生产环境配置
    if (isProduction) {
      // 删除预加载
      config.plugins.delete('preload')
      config.plugins.delete('prefetch')

      // 抽离
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial' // only package third parties that are initially dependent
          },
          elementUI: {
            name: 'chunk-elementUI', // split elementUI into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
          },
          commons: {
            name: 'chunk-commons',
            test: resolve('src/components'), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true
          }
        }
      })
      config.optimization.runtimeChunk('single')
    }

    // config.when(process.env.NODE_ENV !== 'development', config => {

    //   config.optimization.runtimeChunk('single')
    // })
  },
  configureWebpack: {
    plugins: [new BundleAnalyzerPlugin()]
  }
}
