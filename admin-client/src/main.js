import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/css/index.scss'
import filters from '@/utils/filters'
import directives from '@/utils/directives'
import { components } from '@/components'
import i18n from '@/utils/i18n'
import { routesConfig } from '@/router/config'
Vue.config.productionTip = false
routesConfig()

Vue.use(filters)
Vue.use(directives)
Vue.use(components)

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
