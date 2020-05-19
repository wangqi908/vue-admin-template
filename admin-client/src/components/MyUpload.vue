<template>
  <!-- 
  事件:
  clearFiles 清空 文件 时的钩子
  preview 查看文件 时的钩子
  remove 移除文件 时的钩子
  submit 提交 上传 时的钩子
  success 上传 文件成功 时的钩子
  error 上传 文件失败 时的钩子

  Slot:
  <el-button @click="upload">上传</el-button>

  属性
  multiple 多选 默认false 布尔值
  auto-upload 自动上传 默认true 布尔值

  表单验证
   this.$refs.ruleForm.validateField('fileList')

 <my-upload-img @success="success" v-model="ruleForm.fileList" />

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
  <div class="my-upload">
    <div class="img-box" v-if="myFileList.length&&accept==='image/*'">
      <div class="img-wrap" v-for="(item, index) in myFileList" :key="index">
        <div class="img">
          <el-image
            :src="item.http+item.url"
            :preview-src-list="myFileList.map(ele=>ele.http+ele.url)"
          ></el-image>
        </div>

        <div class="remove add-transition" @click="remove(index)" v-if="!disabled">X</div>
      </div>
    </div>
    <!-- 多选时增加按钮一直显示,单选时只要图片出现,增加按钮就隐藏 -->
    <label for="fileInput" v-if="multiple||!myFileList.length">
      <div class="add-btn flex-center">
        <i class="el-icon-plus"></i>
      </div>
    </label>
    <input
      type="file"
      @change="inputFileChange"
      :accept="accept"
      :multiple="multiple"
      id="fileInput"
      ref="fileInput"
    />
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { uploadReq } from '@/apis'
export default {
  model: {
    prop: 'fileList',
    event: 'change'
  },
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
      default: false
    },
    fileList: {
      type: Array,
      default: () => []
    },
    accept: {
      type: String,
      default: 'image/*'
    }
  },
  data() {
    return {
      myFileList: this.fileList,
      fileWrap: []
    }
  },
  methods: {
    // change上传input
    inputFileChange(e) {
      let targetList = e.target.files
      targetList.forEach(file => {
        const fr = new FileReader()
        fr.readAsDataURL(file)
        fr.onloadend = () => {
          this.fileWrap.push(file)
          this.submit()
        }
      })
    },
    // 提交上传请求
    submit() {
      let { myFileList, fileWrap } = this
      fileWrap.forEach(async file => {
        let fd = new FormData()
        fd.append('file', file)
        const res = await uploadReq(fd)
        if (res.data.code === 200) {
          let resData = res.data.data
          myFileList.push({
            http: resData.http,
            url: resData.fileList[0]
          })
          this.$emit('success', resData)
        } else {
          this.$emit('error', res.data)
        }
      })
    },
    // 移除文件
    remove(index) {
      let { myFileList, fileWrap } = this
      myFileList.splice(index, 1)
      fileWrap.splice(index, 1)
      this.$refs.fileInput.value = ''
      this.$emit('remove', myFileList)
    },
    // 清空
    clearFiles() {
      this.myFileList = []
      this.$refs.fileInput.value = ''
    },
    preview(item) {
      this.$emit('preview', item)
    }
  },
  watch: {
    myFileList(val) {
      this.$emit('change', val)
    },
    fileList(val) {
      this.myFileList = val
      if (val.length === 0) {
        this.$refs.fileInput.value = ''
        this.fileWrap = []
      }
    }
  }
}
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
  input[type='file'] {
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
      border: 1px solid rgb(165, 163, 163);
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
