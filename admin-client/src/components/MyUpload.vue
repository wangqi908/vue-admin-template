<template>
  <!-- 
  事件:
  change 改变 文件 时的钩子
  clearFiles 清空 文件 时的钩子
  preview 查看文件 时的钩子
  remove 移除文件 时的钩子
  submit 提交 上传 时的钩子
  success 上传 文件成功 时的钩子
  error 上传 文件失败 时的钩子
  uploadProgress 上传进度

  Slot:
  <el-button @click="upload">上传</el-button>

  属性
  multiple 多选 默认false 布尔值
  auto-upload 自动上传 默认true 布尔值

  <my-upload @change="change" @success="success" @preview="preview" ref="upload">
<el-button @click="clearFiles">清空</el-button>
    <el-button @click="upload">上传</el-button>
    </my-upload>

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
 -->
  <div class='my-upload'>
    <div class="img-box" v-if="myFileList.length">
      <div class="img-wrap" v-for="(item, index) in myFileList" :key="index">
        <img class="img" :src="item.url" @click="preview(item, index)">
        <div class="remove" @click="remove(index)" v-if="!disabled">
          X
        </div>
      </div>
    </div>
    <!-- 多选时增加按钮一直显示,单选时只要图片出现,增加按钮就隐藏 -->
    <label for="fileInput" v-if="multiple||!myFileList.length">
      <div class="add-btn flex-center">
        <i class="el-icon-plus"></i>
      </div>
    </label>
    <input type="file" @change="inputFileChange" accept="image/*" :multiple="multiple" id="fileInput">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { uploadReq } from "@/apis";
import { mapState } from "vuex";
export default {
  props: {
    multiple: {
      type: Boolean,
      default: false
    },
    autoUpload: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: true
    },
    fileList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      myFileList: this.fileList
    };
  },
  methods: {
    // change上传input
    inputFileChange(e) {
      let { myFileList, multiple, autoUpload } = this;
      let targetList = e.target.files;
      targetList.forEach((ele, index) => {
        const fr = new FileReader();
        fr.readAsDataURL(ele);
        fr.onloadend = () => {
          let obj = {
            file: ele,
            url: fr.result
          };
          multiple ? this.myFileList.push(obj) : (this.myFileList = [obj]);
          if (index === targetList.length - 1 && autoUpload) {
            this.submit();
          }
        };
      });
      this.$emit("change", myFileList);
    },
    // 提交上传请求
    async submit() {
      let { myFileList } = this;
      let fd = new FormData();
      myFileList.forEach(ele => {
        fd.append("file", ele.file);
      });
      const res = await uploadReq(fd);
      if (res.data.code === 200) {
        let resData = res.data.data;
        this.$emit("success", resData);
      } else {
        this.$emit("error", res.data);
      }
    },
    // 移除文件
    remove(index) {
      let { myFileList } = this;
      myFileList.splice(index, 1);
      this.$emit("remove", myFileList);
    },
    // 清空
    clearFiles() {
      this.myFileList = [];
    },
    preview(item) {
      this.$emit("preview", item);
    }
  },
  computed: {
    ...mapState(["uploadProgress"])
  },
  watch: {
    uploadProgress(val) {
      this.$emit("uploadProgress", val);
    },
    myFileList(val) {
      this.$emit("update:fileList", val);
    },
    fileList(val) {
      this.myFileList = val;
    }
  }
};
</script>

<style lang='scss'>
.my-upload {
  color: #ccc;
  display: flex;
  height: fit-content;
  align-items: center;
  .add-btn {
    border: 1px dashed #ccc;
    width: 100px;
    height: 100px;
    i {
      font-size: 50px;
    }
    &:hover {
      cursor: pointer;
      border: 1px dashed rgb(130, 176, 236);
    }
  }
  input[type="file"] {
    display: none;
  }
  .img-box {
    display: flex;
    .img-wrap {
      margin: 10px;
      position: relative;
    }
    .remove {
      position: absolute;
      right: -10px;
      top: -10px;
      border: 1px solid #ccc;
      width: 20px;
      height: 20px;
      line-height: 20px;
      text-align: center;
      border-radius: 50%;
      &:hover {
        cursor: pointer;
        color: rgb(130, 176, 236);
        border: 1px solid rgb(130, 176, 236);
      }
    }
    .img {
      width: 100px;
      height: 100px;
    }
  }
}
</style>
