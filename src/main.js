import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Button, Input, InputNumber, } from 'element-ui';
Vue.use(Button).use(Input).use(InputNumber)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
