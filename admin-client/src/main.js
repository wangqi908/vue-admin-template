import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BaiduMap from 'vue-baidu-map'
import "@/assets/css/index.scss";
import { routerConfig, axiosConfig, permissionConfig, i18n } from '@/config'

axiosConfig()
routerConfig()

Vue.use(BaiduMap, {
  ak: 'QyBoyPZx0VZfYo7WuZjhCQpBc7IO2fLr'
})
Vue.config.productionTip = false

// 刷新时重置路由
let { userInfo } = store.state
if (userInfo.roles) permissionConfig()

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
