<template>
  <div class=''>
    <div>
      <div class="img-box" v-for="(item, index) in urlList" :key="index">
        <img class="img" :src="item" alt="" srcset="">
      </div>
      <input type="file" @change="inputFileChange" multiple="multiple">
      <button @click="upload">上传</button>
    </div>
  </div>
</template>

<script>
import { uploadReq, loginReq } from "@/apis";
export default {
  components: {},
  data() {
    return {
      fileList: [],
      url: "",
      urlList: []
    };
  },
  methods: {
    inputFileChange(e) {
      let { urlList, fileList } = this;
      let targetList = e.target.files;
      targetList.forEach(ele => {
        fileList.push(ele);
        const fr = new FileReader();
        fr.readAsDataURL(ele);
        fr.onloadend = () => {
          urlList.push(fr.result);
        };
      });
    },
    async upload() {
      let { fileList } = this;
      let fd = new FormData();
      fileList.forEach(ele => {
        fd.append("file", ele);
      });
      const res = await uploadReq(fd);
      if (res.data.code !== 200) return;
      let resData = res.data.data;
      console.log(resData);
    }
  },
  created() {},
  mounted() {},
  computed: {},
  watch: {}
};
</script>

<style lang='scss'>
.img {
  width: 100px;
  height: 100px;
}
</style>
