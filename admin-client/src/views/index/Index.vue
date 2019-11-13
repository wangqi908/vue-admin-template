<template>
  <div class='index'>
    <el-button @click="test">ww</el-button>
    <el-input v-model="input" placeholder="请输入内容"></el-input>
    <p>{{num}}</p>
    <el-button @click="testToken">token</el-button>
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
    ...mapMutations(["addNum"]),

    test() {
      this.addNum(1);
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
