<template>
  <div class>
    <h5>根据自定义指令传入不同角色看到不同元素</h5>
    <my-role-element />
  </div>
</template>

<script>
import MyRoleElement from './MyRoleElement.vue'
export default {
  components: { MyRoleElement }
}
</script>
