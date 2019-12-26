import Vue from 'vue'
import Element from 'element-ui'
import VueI18n from 'vue-i18n'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
Vue.use(VueI18n)
let zhJson = require('@/assets/languages/zh.json')
let zh = Object.assign(zhJson, zhLocale)
let enJson = require('@/assets/languages/en.json')
let en = Object.assign(enJson, enLocale)

const i18n = new VueI18n({
  locale: 'zh', // 定义默认语言为中文 
  messages: {
    zh,
    en
  }
});
Vue.use(Element, {
  i18n: (key, value) => i18n.t(key, value)
})

new Vue({ i18n }).$mount('#app')
export default i18n
