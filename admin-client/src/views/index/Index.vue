<template>
  <div class='index'>
    <el-button @click="testToken">用户信息</el-button>
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
    <!-- <my-map />
    <my-echarts /> -->
  </div>
</template>

<script>
import { userInfoReq } from "@apis";
import roleShow from "@/directive/roles-show";
// import { MyEcharts, MyMap } from "./components";
export default {
  // components: { MyEcharts, MyMap },
  directives: {
    roleShow
  },
  data() {
    return {
      input: ""
    };
  },
  methods: {
    async testToken() {
      const res = await userInfoReq();
    }
  }
};
</script>
