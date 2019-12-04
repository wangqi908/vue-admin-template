<template>
  <div class='index'>
    <el-button @click="test">ww</el-button>
    <p>{{num}}</p>
    <el-button @click="testToken">用户信息</el-button>
    <el-button @click="loginOut">退出</el-button>
    <my-map />
    <my-echarts />
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { userInfoReq } from "@apis";
import { MyEcharts, MyMap } from "./components";
export default {
  components: { MyEcharts, MyMap },
  data() {
    return {
      input: ""
    };
  },
  methods: {
    ...mapMutations(["addNum", "removeUserInfo", "removeToken"]),

    test() {
      this.addNum(1);
    },

    loginOut() {
      this.removeUserInfo();
      this.removeToken();
      this.$router.replace("/login");
    },

    async testToken() {
      const res = await userInfoReq();
      console.log(res);
    }
  },
  created() {},
  mounted() {},
  computed: {
    ...mapState(["num"])
  },
  watch: {}
};
</script>

<style lang='scss'>
</style>
