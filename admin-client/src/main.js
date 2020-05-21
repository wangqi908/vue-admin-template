import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/css/index.scss'
// import './element-variables.scss'
import filters from '@/utils/filters'
import directives from '@/utils/directives'
import i18n from '@/utils/i18n'
import BaiduMap from 'vue-baidu-map'
import { components } from '@/components'
import { routesConfig } from '@/router/config'
Vue.config.productionTip = false
routesConfig()
Vue.use(components)

Vue.use(BaiduMap, {
  ak: 'QyBoyPZx0VZfYo7WuZjhCQpBc7IO2fLr'
})

Vue.use(filters)
Vue.use(directives)

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
