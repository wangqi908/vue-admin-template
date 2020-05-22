<template>
  <div class="login-form">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off" show-password></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" show-password></el-input>
      </el-form-item>
      <el-form-item label="上传头像">
        <my-upload v-model="fileList"></my-upload>
      </el-form-item>
      <el-form-item prop="captcha">
        <MyCaptcha :captcha.sync="ruleForm.captcha" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { registerReq } from '@/apis'
import {
  usernameValidator,
  passwordValidator,
  captchaValidator
} from '@/utils/validator'
import { MyCaptcha } from '@/components'
export default {
  components: { MyCaptcha },
  data() {
    let validateCheckPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      fileList: [],
      ruleForm: {
        username: '',
        password: '',
        checkPass: '',
        captcha: ''
      },
      rules: {
        username: usernameValidator,
        password: passwordValidator,
        checkPass: [
          { required: true, validator: validateCheckPass, trigger: 'change' }
        ],
        captcha: captchaValidator
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.register()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.fileList = []
    },
    async register() {
      let { fileList } = this
      let { username, password, captcha } = this.ruleForm

      let sendData = { username, password, captcha }

      if (fileList.length) {
        sendData.avatar = fileList[0].url
      }
      const res = await registerReq(sendData)
      if (res.data.code === 200) {
        this.$message.success('注册成功请登录')
        this.$router.replace('/login')
      }
    }
  }
}
</script>

<style lang='scss'>
.login-form {
  max-width: 400px;
  margin: 0 auto;
  padding-top: 160px;
  .el-form-item__label {
    color: rgb(226, 226, 226);
  }
  .title {
    text-align: center;
    margin-bottom: 30px;
    color: rgb(226, 226, 226);
  }
  .footer {
    display: flex;
    justify-content: space-between;
  }
  .submit {
    width: 100%;
    color: #fff;
    border: 0;
    background: #7d7de8;
    &:hover {
      background: #9e9ef3;
    }
    &:focus {
      background: #5454db;
    }
    &:active {
      background: #5454db;
    }
  }
  .tip {
    color: rgb(226, 226, 226);
    font-size: 14px;
    span {
      margin-right: 10px;
    }
  }
}
</style>
