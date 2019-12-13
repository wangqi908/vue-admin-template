<template>
  <div class="login-input-box">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        <el-button @click="register">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { loginReq, userInfoReq } from "@apis";
import { permissionConfig } from "@/config";
export default {
  data() {
    return {
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "change" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "change" }]
      }
    };
  },
  methods: {
    ...mapMutations(["setUserInfo", "setToken"]),

    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.login();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    register(formName) {
      this.$router.push("/register");
    },

    async login() {
      let { username, password } = this.ruleForm;
      let sendData = { username, password };
      const res = await loginReq(sendData);
      if (res.data.code === 200) {
        let { token, info } = res.data.data;
        this.setToken(token);
        const userInfoRes = await userInfoReq();
        if (userInfoRes.data.code === 200) {
          let userInfo = res.data.data;
          this.setUserInfo(userInfo);
          permissionConfig();
          this.$router.replace("/");
        }
      }
    }
  }
};
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
