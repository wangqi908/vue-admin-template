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
    <div class="img-box" v-if="fileList.length">
      <div class="img-wrap" v-for="(item, index) in fileList" :key="index">
        <img class="img" :src="item.url" @click="preview(item, index)">
        <div class="remove" @click="remove(index)">
          X
        </div>
      </div>
    </div>
    <label for="fileInput">
      <div class="add-btn flex-center">
        <i class="el-icon-plus"></i>
      </div>
    </label>
    <input type="file" @change="inputFileChange" accept="image/*" :multiple="multiple" id="fileInput">
    <div>
      <!-- <el-button @click="submit">上传</el-button> -->
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
    }
  },
  data() {
    return {
      fileList: []
    };
  },
  methods: {
    // change上传input
    inputFileChange(e) {
      let { fileList, multiple } = this;
      let targetList = e.target.files;
      targetList.forEach(ele => {
        const fr = new FileReader();
        fr.readAsDataURL(ele);
        fr.onloadend = () => {
          let obj = {
            file: ele,
            url: fr.result
          };
          multiple ? this.fileList.push(obj) : (this.fileList = [obj]);
        };
      });
      this.$emit("change", fileList);
    },
    // 提交上传请求
    async submit() {
      let { fileList } = this;
      let fd = new FormData();
      fileList.forEach(ele => {
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
      let { fileList } = this;
      fileList.splice(index, 1);
      this.$emit("change", fileList);
    },
    // 清空
    clearFiles() {
      this.fileList = [];
    },
    preview(item) {
      this.$emit("preview", item);
    }
  },
  computed: {
   ...mapState(["uploadProgress"]),

  },
  watch: {
     uploadProgress(val){
       this.$emit("uploadProgress", val);
     }
  },
};
</script>

<style lang='scss'>
.my-upload {
  border: 1px solid #000;
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
      border: 1px solid #000;
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
