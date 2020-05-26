<template>
  <div class>
    <div v-role="['index']">
      <p>index 权限可见</p>
    </div>

    <div v-role="['clipboard']">
      <p>clipboard 权限可见</p>
    </div>

    <div v-role="['user','role']">
      <p>user role 权限可见</p>
    </div>

    <div v-role="['user-add']">
      <p>user添加</p>
    </div>
  </div>
</template>

<script>
export default {}
</script>
