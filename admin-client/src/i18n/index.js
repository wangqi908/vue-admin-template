import Vue from 'vue'
import VueI18n from 'vue-i18n'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import locale from 'element-ui/lib/locale'

Vue.use(VueI18n)
let zhJson = require('@/assets/languages/zh.json')
let zh = Object.assign(zhJson, zhLocale)
let enJson = require('@/assets/languages/en.json')
let en = Object.assign(enJson, enLocale)

const i18n = new VueI18n({
  locale: 'zh',
  messages: {
    zh,
    en
  }
})
locale.i18n((key, value) => i18n.t(key, value))

export default i18n
