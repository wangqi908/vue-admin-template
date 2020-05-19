/* 
自定义指令
根据角色id控制元素显示隐藏
 数组里传入角色id 或者角色名称 
 最好传入角色名称 因为id会在不同环境发生变化
 v-roleShow="['总经理',17]" 
*/
// import { getUserInfo, getRoleList } from '@/utils/dict';
import store from '@/store';

/**
 * @method getRoleIdByRoleName
 * @param {number|string} val - 数组里传入角色id 或者角色名称
 * @returns {number|string} 角色id
 * @desc getRoleIdByRoleName
 */
const getRoleIdByRoleName = (val = "") => {
  let userInfo = store.state.userInfo
  let roleArr = userInfo.roles //角色
  let role = roleArr.find(ele => ele.name === val || ele.id === val);
  return role ? role.id : "";
}

const handleElementShow = (el, binding) => {
  let userInfo = store.state.userInfo
  let { value } = binding;
  let arr = []  //管理员角色id为1 可以看到所有
  value.forEach(ele => {
    let id = getRoleIdByRoleName(ele)
    if (id) arr.push(id)
  })
  let roleIds = userInfo.roles.map(ele => ele.id)
  let isShow = arr.filter(v => { return roleIds.indexOf(v) > -1 }).length > 0;
  el.style.display = isShow ? '' : 'none'
}

export default {
  bind: (el, binding) => {
    handleElementShow(el, binding)
  }
}
