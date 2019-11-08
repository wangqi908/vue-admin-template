<template>
  <div class='index'>
    <img alt="Vue logo" src="@/assets/logo.png">
    <el-button @click="$router.push('/login')">ww</el-button>
    <el-input v-model="input" placeholder="请输入内容"></el-input>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      input: ""
    };
  },
  methods: {},
  created() {},
  mounted() {},
  computed: {},
  watch: {}
};
</script>

<style lang='scss'>
</style>
