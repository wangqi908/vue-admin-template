<template>
  <div class="login-form">
    <h2 class="title">系统登录</h2>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm">
      <el-form-item prop="username">
        <el-input
          v-model.number="ruleForm.username"
          placeholder="用户名"
          @keyup.enter.native="submitForm('ruleForm')"
        ></el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          type="password"
          v-model="ruleForm.password"
          autocomplete="off"
          placeholder="密码"
          show-password
          @keyup.enter.native="submitForm('ruleForm')"
        ></el-input>
      </el-form-item>

      <el-form-item class="footer">
        <el-button type="primary" @click="submitForm('ruleForm')" :loading="loading">登录</el-button>
        <el-button @click="$router.push('/register')">注册</el-button>
      </el-form-item>
    </el-form>
    <div class="tip">
      <span>账户:admin</span>
      <span>密码:admin</span>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
import { loginReq } from '@/apis'
import { routesConfig } from '@/router/config'
import { usernameValidator, passwordValidator } from '@/utils/validator'
export default {
  data() {
    return {
      loading: false,
      ruleForm: {
        password: '',
        username: ''
      },
      rules: {
        username: usernameValidator,
        password: passwordValidator
      }
    }
  },
  methods: {
    ...mapMutations([
      'setToken',
      'setUserInfo',
      'setPropList',
      'setHistoryList'
    ]),
    ...mapActions(['getUserInfoAction']),
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.login()
        } else {
          return false
        }
      })
    },

    async login() {
      let { username, password } = this.ruleForm
      let sendData = { username, password }
      this.loading = true

      try {
        const res = await loginReq(sendData)
        this.loading = false
        if (res.data.code === 200) {
          let token = res.data.data.token
          this.setToken(token)

          this.getUserInfoAction().then(() => {
            routesConfig()
            // 返回路径
            let path = this.$route.query.re || '/'
            this.$router.push(path)
          })
        }
      } catch (err) {
        this.loading = false
      }
    }
  },
  created() {
    this.setToken()
    this.setUserInfo()
    this.setPropList()
    this.setHistoryList()
  }
}
</script>

<style lang="scss">
.login-form {
  max-width: 400px;
  margin: 0 auto;
  padding-top: 160px;
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