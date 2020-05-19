<template>
  <div class="upload-avatar">
    <my-upload @remove="remove" @success="success" :fileList.sync="fileList" :disabled="disabled" />
    <p>{{url}}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      disabled: false,
      fileList: [],
      url: ''
    }
  },
  methods: {
    // 图片删除
    remove() {
      this.url = ''
    },
    // 图片上传成功
    success(v) {
      this.url = v.http + v.fileList[0]
    }
  }
}
</script>

