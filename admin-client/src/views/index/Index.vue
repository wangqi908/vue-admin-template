<template>
  <div class='index'>
    <el-button @click="test">ww</el-button>
    <el-input v-model="input" placeholder="请输入内容"></el-input>
    {{num}}
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
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
