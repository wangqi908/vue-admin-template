<template>
  <!-- 
  事件:
  change 改变 文件 时的钩子
  clearFiles 清空 文件 时的钩子
  preview 查看文件 时的钩子
  submit 提交 上传 时的钩子
  success 上传 文件成功 时的钩子
  error 上传 文件失败 时的钩子

  Slot:
  <el-button @click="upload">上传</el-button>

  属性
  multiple 多选 默认false 布尔值
 -->
  <div class='login'>
    <my-upload @change="change" @success="success" @preview="preview" ref="upload">

    </my-upload>

    <el-button @click="clearFiles">清空</el-button>
    <el-button @click="upload">上传</el-button>

    <!-- <my-form /> -->
  </div>
</template>

<script>
import { MyForm } from "./components";
import { MyUpload } from "@/components";
export default {
  components: { MyForm, MyUpload },
  data() {
    return {};
  },
  methods: {
    clearFiles() {
      this.$refs.upload.clearFiles();
    },
    upload() {
      this.$refs.upload.submit();
    },
    change(v) {
      console.log(v);
    },
    preview(v) {
      console.log(v);
    },
    success(resData) {
      console.log(resData);
    }
  }
};
</script>

<style lang='scss'>
.login {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
}
</style>
