<template>
  <el-dialog :title="title" :visible.sync="myVisible">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username" autocomplete="off" :disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" v-if="type==='add'">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off" show-password></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass" v-if="type==='add'">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="ruleForm.remark" autocomplete="off" :disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="头像" v-if="fileList.length||!disabled">
        <my-upload @remove="remove" @success="success" :fileList.sync="fileList" :disabled="disabled" ref="upload">
        </my-upload>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm('ruleForm')">确认</el-button>
      <el-button @click="myVisible=false">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { registerReq, userViewReq, userEditReq, userAddReq } from "@apis";
import { elementReset } from "@/utils";
import { MyUpload } from "@/components";
export default {
  components: { MyUpload },
  props: ["visible", "_id", "type"],
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
      myVisible: this.visible,
      disabled: true,
      title: "",
      fileList: [],
      ruleForm: {
        username: "",
        password: "",
        checkPass: "",
        remark: "",
        avatar: ""
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
          this.handleComfrim();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleComfrim() {
      let { type } = this;
      type === "add" ? this.add() : this.edit();
    },

    async edit() {
      let { ruleForm } = this;
      const res = await userEditReq(ruleForm);
      if (res.data.code === 200) {
        let resData = res.data.data;
        this.$message.success("修改成功");
        this.$emit("before-close");
        this.myVisible = false;
      }
    },

    async add() {
      let { ruleForm } = this;
      const res = await userAddReq(ruleForm);
      if (res.data.code === 200) {
        let resData = res.data.data;
        this.$message.success("添加成功");
        this.$emit("before-close");
        this.myVisible = false;
      }
    },
    // 图片删除
    remove(v) {
      this.ruleForm.avatar = "";
    },
    // 图片上传成功
    success(v) {
      this.ruleForm.avatar = v.fileList[0];
    },
    async getInfo() {
      let { _id } = this;
      const res = await userViewReq({ _id });
      if (res.data.code === 200) {
        let resData = res.data.data;
        if (resData.avatar) {
          // this.fileList[0].url = resData.http + resData.avatar;
          this.fileList = [
            {
              url: resData.http + resData.avatar
            }
          ];
        }
        this.ruleForm = resData;
      }
    },

    initView() {
      if (this._id) {
        this.getInfo();
      } else {
        elementReset(this.ruleForm);
        elementReset(this.fileList);
      }
      let type = this.type;
      this.disabled = type === "view";
      switch (type) {
        case "view":
          this.title = "查看";
          break;
        case "edit":
          this.title = "修改";
          break;
        case "add":
          this.title = "添加";
          break;
        default:
          "";
          break;
      }
    }
  },
  watch: {
    visible(v) {
      this.myVisible = v;
    },
    myVisible(v) {
      this.$emit("update:visible", v);
    }
  },
  created() {
    this.initView();
  }
};
</script>

<style lang='scss'>
</style>
