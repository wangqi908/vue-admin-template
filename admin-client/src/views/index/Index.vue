<template>
  <div class='index'>
    <!-- <div class="flex-center">
      <el-input v-model="value" />
      <el-button @click="copy">复制</el-button>
    </div> -->
    <!-- <my-role-element /> -->
    <!-- <my-map />
    <my-echarts /> -->
    <MyEditor v-model="value" />
  </div>
</template>

<script>
import { MyRoleElement } from "./components";
import { MyEditor } from "@/components";
import { copyToClipboard } from "@/utils";
export default {
  components: { MyRoleElement, MyEditor },
  data() {
    return {
      value: "测试"
    };
  },
  methods: {
    // copy() {
    //   copyToClipboard(this.value).then(res => {
    //     if (res) {
    //       this.$message({
    //         message: "已成功复制到剪切板",
    //         type: "success"
    //       });
    //     }
    //   });
    // }
  }
};
</script>
