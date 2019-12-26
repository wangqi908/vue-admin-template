<template>
  <div class='ocr'>

    <div class="img-box" v-if="base64str">
      <div class="img-wrap">
        <img class="img" :src="base64str">
        <div class="remove add-transition" @click="remove">
          X
        </div>
      </div>
    </div>

    <label for="fileInput" v-if="!base64str">
      <div class="add-btn flex-center ">
        <i class="el-icon-plus"></i>
      </div>
    </label>

    <input type="file" @change="setImgToBase64" ref="file" id="fileInput" accept="image/jpg,image/jpeg,image/png">

    <el-button @click="getOcr">识别</el-button>

    <p v-for="(item, index) in list" :key="index">
      {{item.words}}
    </p>
  </div>
</template>

<script>
import { generalBasicReq } from "@/apis";
export default {
  components: {},
  data() {
    return {
      list: [],
      base64str: "",
      maxImgFileSize: 2100000 //上传图片最大值(单位字节)（ 2 M = 2097152 B ）超过2M上传失败
    };
  },
  methods: {
    remove() {
      this.base64str = "";
    },
    // 把图片转成base64
    setImgToBase64() {
      let reader = new FileReader();
      let maxImgFileSize = this.maxImgFileSize;
      let file = this.$refs.file.files[0];
      if (!file) return;
      //将文件以Data URL形式读入页面
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (maxImgFileSize != 0 && maxImgFileSize < reader.result.length) {
           this.$message.warning("上传失败，请上传不大于2M的图片！");
          return;
        } else {
          let base64str = reader.result;
          this.base64str = base64str;
        }
      };
    },
    // 请求文字识别
    async getOcr() {
      let { base64str } = this;
      if (!base64str) {
        this.$message.warning("请选择图片");
        return;
      }
      let image = base64str.substring(base64str.indexOf(",") + 1);
      const res = await generalBasicReq({ image });
      if (res.data.code === 200) {
        let resData = res.data.ocrRes;
        resData = JSON.parse(resData);
        let { words_result } = resData;
        if (words_result.length === 0) {
          this.$message.warning("图片未识别到文字");
          return;
        }
        this.list = words_result;
      }
    }
  }
};
</script>

<style lang='scss'>
.ocr {
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
