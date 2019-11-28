<template>
  <div class="login-input-box">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off" show-password></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { registerReq } from "@apis";
export default {
  data() {
    let passwordReg = /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]{8,16}$/;
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!passwordReg.test(value)) {
        callback(new Error("请输入8～16位字母、数字及特殊符号组合"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    let validateCheckPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        username: "",
        password: "",
        checkPass: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "change" },
          {
            min: 3,
            max: 15,
            message: "长度在 3 到 15 个字符",
            trigger: "change"
          }
        ],
        password: [
          { required: true, validator: validatePass, trigger: "change" }
        ],
        checkPass: [
          { required: true, validator: validateCheckPass, trigger: "change" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.register();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    async register() {
      let { username, password } = this.ruleForm;
      let sendData = { username, password };
      const res = await registerReq(sendData);
      if (res.data.code === 200) {
        let resData = res.data.data;
        this.$message.success("注册成功请登录");
        this.$router.replace("/login");
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
  margin-top: 20%;
  border: 1px solid #ccc;
  border-radius: 20px;
  background-color: rgba(224, 224, 224, 0.3);
}
</style>
