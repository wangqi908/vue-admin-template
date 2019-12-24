<template>
  <div class='index'>
    <el-button @click="testToken">用户信息</el-button>
    <my-role-element />
    <!-- <my-map />
    <my-echarts /> -->
  </div>
</template>

<script>
import { userInfoReq } from "@apis";
import { MyRoleElement } from "./components";
export default {
  components: { MyRoleElement },
  data() {
    return {
    };
  },
  methods: {
    async testToken() {
      const res = await userInfoReq();
    }
  }
};
</script>
