<template>
  <div class='index'>
    <!-- <div class="flex-center">
      <el-input v-model="value" />
      <el-button @click="copy">复制</el-button>
    </div> -->
    <!-- <my-role-element /> -->
    <!-- <my-map />
    <my-echarts /> -->
  </div>
</template>

<script>
import { MyRoleElement } from "./components";
import { MyEditor } from "@/components";
import { copyToClipboard } from "@/utils";
export default {
  components: { MyRoleElement, MyEditor },
};
</script>
