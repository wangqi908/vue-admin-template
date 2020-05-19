import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/css/index.scss'
// import './element-variables.scss'
import filters from '@/utils/filters'
import i18n from '@/i18n'
import BaiduMap from 'vue-baidu-map'
import { components } from '@/components'

Vue.config.productionTip = false

Vue.use(components)

Vue.use(BaiduMap, {
  ak: 'QyBoyPZx0VZfYo7WuZjhCQpBc7IO2fLr'
})

Vue.use(filters)

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
