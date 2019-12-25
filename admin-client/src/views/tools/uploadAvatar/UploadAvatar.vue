<template>
  <div class='upload-avatar'>
    <my-upload @remove="remove" @success="success" @preview="preview" :fileList.sync="fileList" :disabled="disabled" ref="upload" />

    <el-dialog title="图片预览" :visible.sync="visible">
      <img class="preview-img" :src="previewUrl" alt="图片预览">
    </el-dialog>

  </div>
</template>

<script>
import { MyUpload } from "@/components";
export default {
  components: { MyUpload },
  data() {
    return {
      disabled: false,
      visible: false,
      fileList: [],
      url: "",
      previewUrl: ""
    };
  },
  methods: {
    // 图片删除
    remove(v) {
      this.url = "";
    },
    // 图片上传成功
    success(v) {
      this.url = v.fileList[0];
    },
    // 图片预览
    preview(v) {
      this.previewUrl = v.url;
      this.visible = true;
    }
  }
};
</script>

<style lang="scss">
.upload-avatar {
  .el-dialog__body {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .preview-img {
    width: 80%;
    height: auto;
  }
}
</style>
