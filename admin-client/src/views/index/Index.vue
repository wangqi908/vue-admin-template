<template>
  <div class='index'>
    <el-input v-model="value" />
    <el-button @click="copy">复制</el-button>
    <my-role-element />
    <!-- <my-map />
    <my-echarts /> -->

  </div>
</template>

<script>
import { MyRoleElement } from "./components";
import { copyToClipboard } from "@/utils";
export default {
  components: { MyRoleElement },
  data() {
    return {
      value: ""
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
