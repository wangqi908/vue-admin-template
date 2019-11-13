import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "@/assets/css/index.scss";
import { elementConfig, routerConfig, axiosConfig } from './config'
elementConfig()
routerConfig()
axiosConfig()

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
