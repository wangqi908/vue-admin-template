<template>
  <div class="login-input-box">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off" show-password></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="上传头像">
        <my-upload v-model="fileList"></my-upload>
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
import { usernameValidator, passwordValidator } from '@/utils/validator'
export default {
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
        checkPass: ''
      },
      rules: {
        username: usernameValidator,
        password: passwordValidator,
        checkPass: [
          { required: true, validator: validateCheckPass, trigger: 'change' }
        ]
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
      let { username, password } = this.ruleForm

      let sendData = { username, password }

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
.login-input-box {
  width: 400px;
  height: fit-content;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 20px;
  background-color: rgba(224, 224, 224, 0.3);
}
</style>
