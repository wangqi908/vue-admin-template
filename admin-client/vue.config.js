const path = require('path')

module.exports = {
  publicPath: './', // 基本路径
  outputDir: 'app', // 输出文件目录
  assetsDir: 'static', //放置生成的静态资源(s、css、img、fonts)的(相对于 outputDir 的)目录(默认'')
  configureWebpack: (config) => {
    // 为生产环境修改配置...
    config.mode = 'production'
    // 将每个依赖包打包成单独的js文件
    let optimization = {
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: Infinity,
        minSize: 20000,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              // get the name. E.g. node_modules/packageName/not/this/part.js
              // or node_modules/packageName
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
              // npm package names are URL-safe, but some servers don't like @ symbols
              return `npm.${packageName.replace('@', '')}`
            }
          }
        }
      }
    }
    Object.assign(config, {
      optimization,
      // 开发生产共同配置
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src'),
          '@c': path.resolve(__dirname, './src/components'),
          '@apis': path.resolve(__dirname, './src/apis/index.js')
        } // 别名配置
      },
      devServer: {
        port: 8888,  // 端口
        open: true, // 自动开启浏览器
        compress: false, // 开启压缩
        overlay: {
          warnings: false,
          errors: false
        }
      },
    })
    config.externals = {
      'vue':'Vue',
      'vuex': 'Vuex',
      'vue-router': 'VueRouter',
      'axios': 'axios',
      'element-ui': 'ELEMENT',
      'echarts': 'echarts',
      'vue-baidu-map': 'VueBaiduMap',
    }
  },
  productionSourceMap: false, // 生产环境是否生成 sourceMap 文件
}