<template>
  <div class="captcha-box">
    <el-input v-model="captcha" autocomplete="off" placeholder="请输入验证码"></el-input>
    <div v-html="pic" class="captcha" @click="getCaptchaPic"></div>
  </div>
</template>

<script>
import { captcha } from '@/apis'
export default {
  data() {
    return {
      captcha: '',
      pic: ''
    }
  },
  methods: {
    async getCaptchaPic() {
      const res = await captcha()
      if (res.data.code !== 200) return
      this.pic = res.data.data
    }
  },
  created() {
    this.getCaptchaPic()
  },
  watch: {
    captcha(val) {
      this.$emit('update:captcha', val)
    }
  }
}
</script>

<style lang="scss" >
.captcha-box {
  display: flex;
  align-items: center;
  .captcha {
    display: flex;
    align-items: center;
    cursor: pointer;
    svg {
      background-color: #fff;
    }
    margin-left: 30px;
  }
}
</style>