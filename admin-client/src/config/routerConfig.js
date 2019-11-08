import router from '../router'
const routerConfig = () => {
  router.beforeEach((to, from, next) => {
    if (to.meta.title) {
      document.title = to.meta.title
    } else {
      document.title = '后台管理系统'
    }
    next();
  })
}
export default routerConfig