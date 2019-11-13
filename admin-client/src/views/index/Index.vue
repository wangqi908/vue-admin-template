<template>
  <div class='index'>
    <el-button @click="test">ww</el-button>
    <el-input v-model="input" placeholder="请输入内容"></el-input>
    <p>{{num}}</p>
    <el-button @click="testToken">用户信息</el-button>
    <el-button @click="loginOut">退出</el-button>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { userInfoReq } from "@apis";
export default {
  components: {},
  data() {
    return {
      input: ""
    };
  },
  methods: {
    ...mapMutations(["addNum","removeUserInfo"]),

    test() {
      this.addNum(1);
    },

    loginOut(){
      this.removeUserInfo()
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
