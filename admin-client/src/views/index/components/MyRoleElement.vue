<template>
  <div class=''>
    <div v-role-show="['index']">
      <p>index 权限可见</p>
    </div>
    <div v-role-show="['echarts']">
      <p>echarts 权限可见</p>
    </div>
    <div v-role-show="['echarts','map']">
      <p>echarts或者map 权限可见</p>
    </div>
    <div v-role-show="['echartsBar']">
      <p>echartsBar 权限可见</p>
    </div>
    <div v-role-show="['map']">
      <p>map 权限可见</p>
    </div>
    <div v-role-show="['info']">
      <p>info 权限可见</p>
    </div>
    <div v-role-show="['user']">
      <p>user 权限可见</p>
    </div>
    <div v-role-show="['role']">
      <p>role 权限可见</p>
    </div>
    <div v-role-show="['uploadData']">
      <p>uploadData 权限可见</p>
    </div>
  </div>
</template>

<script>
import roleShow from "@/directive/roles-show";
export default {
  directives: { roleShow }
};
</script>
