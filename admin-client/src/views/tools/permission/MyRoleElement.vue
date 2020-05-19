<template>
  <div class>
    <div v-role-show="['index']">
      <p>index 权限可见</p>
    </div>

    <div v-role-show="['clipboard']">
      <p>clipboard 权限可见</p>
    </div>

    <div v-role-show="['user','role']">
      <p>user role 权限可见</p>
    </div>
  </div>
</template>

<script>
import roleShow from '@/directive/roles-show'
export default {
  directives: { roleShow }
}
</script>
