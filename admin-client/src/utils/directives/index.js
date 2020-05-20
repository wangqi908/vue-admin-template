import store from '@/store'

const handleElementShow = (el, binding) => {
  const permissions = store.state.permissions
  let { value } = binding
  let isShow =
    value.filter(v => {
      return permissions.indexOf(v) > -1
    }).length > 0
  el.style.display = isShow ? '' : 'none'
}

let directives = {
  role: {
    bind: (el, binding) => {
      handleElementShow(el, binding)
    },
    update: (el, binding) => {
      handleElementShow(el, binding)
    }
  }
}

export default Vue => {
  Object.keys(directives).forEach(key => {
    Vue.directive(key, directives[key])
  })
}
