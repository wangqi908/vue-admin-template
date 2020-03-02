<template>
  <div class="canvas2pic">
    <div class="img-box" ref="imgBox">
      <img src="http://192.168.10.78:8088/0008I.jpg" />
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
    <div class="print" @click="generatorImage">
      <span>打印</span>
    </div>
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
        // this.$refs.addImage.append(canvas);//在下面添加canvas节点

        // console.log(canvas.toDataURL('image/png'))
        // this.$refs.imgBox.appendChild(canvas)
        // this.bgurl = canvas.toDataURL('image/png')

        let link = document.createElement('a')
        link.href = canvas.toDataURL() //下载链接
        link.setAttribute('download', '人员卡.png')
        link.style.display = 'none' //a标签隐藏
        document.body.appendChild(link)
        link.click()
      })
    }
  },
  created() {}
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