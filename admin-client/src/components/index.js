export { default as Head } from './Head'
export { default as Menu } from './menu/Menu'
export { default as MyEditor } from './MyEditor'
export { default as MySticky } from './MySticky'

import MyPagination from './MyPagination'
import DelDialog from './DelDialog'
import MyUpload from './MyUpload'

export const components = Vue => {
  Vue.component('MyPagination', MyPagination)
  Vue.component('DelDialog', DelDialog)
  Vue.component('MyUpload', MyUpload)
}
