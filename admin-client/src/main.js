import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BaiduMap from 'vue-baidu-map'
import "@/assets/css/index.scss";
import { routerConfig, axiosConfig } from './config'
// import XLSX from 'xlsx'
// Vue.prototype.$XLSX = XLSX

axiosConfig()
routerConfig()
Vue.use(BaiduMap, {
  ak: 'QyBoyPZx0VZfYo7WuZjhCQpBc7IO2fLr'
})
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
