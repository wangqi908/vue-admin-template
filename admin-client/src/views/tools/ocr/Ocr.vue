<template>
  <div class='ocr'>
    <input type="file" @change="test" ref="file" accept="image/jpg,image/jpeg,image/png">
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
      list:[]
    };
  },
  methods: {
    test() {
      var reader = new FileReader();
      var AllowImgFileSize = 4200000; //上传图片最大值(单位字节)（ 2 M = 2097152 B ）超过4M上传失败
      let file = this.$refs.file.files[0];
      if (file) {
        //将文件以Data URL形式读入页面
        reader.readAsDataURL(file);
        reader.onload = () => {
          if (
            AllowImgFileSize != 0 &&
            AllowImgFileSize < reader.result.length
          ) {
            alert("上传失败，请上传不大于4M的图片！");
            return;
          } else {
            let base64str = reader.result;
            let base64 = base64str.substring(base64str.indexOf(",") + 1);
            this.getOcr(base64);
          }
        };
      }
    },
    async getOcr(image) {
      const res = await generalBasicReq({ image });
      if (res.data.code === 200) {
        let resData = res.data.ocrRes;
        let { words_result } = resData;
        this.list = words_result
      }
    }
  }
};
</script>

<style lang='scss'>
</style>
