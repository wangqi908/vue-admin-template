import store from '@/store'
const permissions = store.state.permissions

const handleElementShow = (el, binding) => {
  let { value } = binding
  let isShow =
    value.filter(v => {
      return permissions.indexOf(v) > -1
    }).length > 0
  el.style.display = isShow ? 'block' : 'none'
}

export default {
  bind: (el, binding) => {
    handleElementShow(el, binding)
  },
  update: (el, binding) => {
    handleElementShow(el, binding)
  }
}
