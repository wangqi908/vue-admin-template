<template>
  <div class=''>
    <div class="flex-center">
      <el-input v-model="value" />
      <el-button @click="copy">复制</el-button>
    </div>
  </div>
</template>

<script>
import { copyToClipboard } from "@/utils";
export default {
  data() {
    return {
      value: "测试"
    };
  },
  methods: {
    copy() {
      copyToClipboard(this.value).then(res => {
        if (res) {
          this.$message({
            message: "已成功复制到剪切板",
            type: "success"
          });
        }
      });
    }
  }
};
</script>

<style lang='scss'>
</style>
