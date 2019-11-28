<template>
  <div class=''>
    <div>
      <input type="file" @change="inputFileChange">
      <button @click="publish">上传</button>
    </div>
  </div>
</template>

<script>
import { uploadReq, loginReq } from "@/apis";
export default {
  components: {},
  data() {
    return { files: "" };
  },
  methods: {
    inputFileChange(e) {
      // input的@change事件拿到数据
      this.files = e.target.files[0];
    },
    async publish() {
      // 把文件放入FormData
      let fd = new FormData();
      fd.append("file", this.files);
      let sendData = {
        username: "admin2",
        password: "123"
      };
      // const res = await loginReq(sendData);
      // console.log(res);

      uploadReq(fd).then(res => {
        console.log(res);
      });
    }
  },
  created() {},
  mounted() {},
  computed: {},
  watch: {}
};
</script>

<style lang='scss'>
</style>
