export { default as Head } from './head/Head'
export { default as Menu } from './menu/Menu'
export { default as MenuWrap } from './menu/MenuWrap'
export { default as MyEditor } from './MyEditor'
export { default as MySticky } from './MySticky'
export { default as MyBreadcrumb } from './MyBreadcrumb'
export { default as MyRouterHistory } from './MyRouterHistory'
export { default as MyCaptcha } from './MyCaptcha'

import MyPagination from './MyPagination'
import DelDialog from './DelDialog'
import MyUpload from './MyUpload'

export const components = Vue => {
  Vue.component('MyPagination', MyPagination)
  Vue.component('DelDialog', DelDialog)
  Vue.component('MyUpload', MyUpload)
}
