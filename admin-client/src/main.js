import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BaiduMap from 'vue-baidu-map'
import "@/assets/css/index.scss";
import { routerConfig, axiosConfig, permissionConfig } from '@/config'

axiosConfig()
routerConfig()
// permissionConfig()
Vue.use(BaiduMap, {
  ak: 'QyBoyPZx0VZfYo7WuZjhCQpBc7IO2fLr'
})
Vue.config.productionTip = false

window.addEventListener("load", () => {

  if (store.state.userInfo.roles) {
    permissionConfig()
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
