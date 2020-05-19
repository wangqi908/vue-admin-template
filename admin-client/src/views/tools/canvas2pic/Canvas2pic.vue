<template>
  <div class="canvas2pic">
    <div class="img-box" ref="imgBox">
      <img src="../../../assets/imgs/touxiang.jpg" />
      <ul>
        <li>
          <span>姓名:</span>
          <span>张三</span>
        </li>
        <li>
          <span>性别:</span>
          <span>女</span>
        </li>
      </ul>
    </div>
    <el-button @click="generatorImage">打印</el-button>
    <img :src="bgurl" alt class="width100b" crossorigin="*" />
  </div>
</template>

<script>
import html2canvas from 'html2canvas'
export default {
  data() {
    return {
      bgurl: ''
    }
  },
  methods: {
    //点击生成图片
    generatorImage() {
      html2canvas(this.$refs.imgBox, {
        useCORS: true,
        logging: false
      }).then(canvas => {
        let link = document.createElement('a')
        link.href = canvas.toDataURL() //下载链接
        link.setAttribute('download', '人员卡.png')
        link.style.display = 'none' //a标签隐藏
        document.body.appendChild(link)
        link.click()
      })
    }
  }
}
</script>

<style lang='scss'>
.canvas2pic {
  .img-box {
    border: 1px solid rgb(39, 24, 245);
    width: 200px;
    background-color: #fff;
    img {
      width: 200px;
      height: 200px;
    }
  }
}
</style>