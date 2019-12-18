<template>
  <el-dialog :title="title" :visible.sync="myVisible">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px">
      <el-form-item label="角色名" prop="name">
        <el-input v-model="ruleForm.name" autocomplete="off" :disabled="disabled"></el-input>
      </el-form-item>

      <el-form-item label="备注">
        <el-input v-model="ruleForm.remark" autocomplete="off" :disabled="disabled"></el-input>
      </el-form-item>

      <el-form-item label="权限树">
        <el-tree ref="tree" :data="tree" default-expand-all :show-checkbox="type!=='view'" node-key="_id"
          :props="defaultProps" :default-checked-keys="roleIds">
        </el-tree>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer" v-if="type!=='view'">
      <el-button type="primary" @click="submitForm('ruleForm')">确认</el-button>
      <el-button @click="myVisible=false">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { permissionTreeReq, roleAddReq, roleViewReq, roleEditReq } from "@apis";
import { elementReset } from "@/utils";
import { mapActions } from "vuex";
export default {
  props: ["visible", "_id", "type"],
  data() {
    return {
      myVisible: this.visible,
      disabled: true,
      title: "",
      ruleForm: {
        name: "",
        remark: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入角色名", trigger: "change" },
          {
            min: 1,
            max: 15,
            message: "长度在 1 到 15 个字符",
            trigger: "change"
          }
        ]
      },
      tree: [], //权限树
      roleIds: [], //权限ids
      defaultProps: {
        children: "children",
        label: "name"
      }
    };
  },
  methods: {
    ...mapActions(["resetRouterOnViewAsync"]),
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
      let sendData = {
        ...ruleForm,
        ids: this.$refs.tree.getCheckedKeys()
      };
      const res = await roleEditReq(sendData);
      if (res.data.code === 200) {
        this.$message.success("修改成功");
        this.$emit("before-close");
        this.myVisible = false;
        this.resetRouterOnViewAsync();
      }
    },

    async add() {
      let { ruleForm } = this;
      let sendData = {
        ...ruleForm,
        ids: this.$refs.tree.getCheckedKeys()
      };
      const res = await roleAddReq(sendData);
      if (res.data.code === 200) {
        let resData = res.data.data;
        this.$message.success("添加成功");
        this.$emit("before-close");
        this.myVisible = false;
      }
    },

    // 获取信息
    async getInfo() {
      let { _id, type, tree } = this;
      const res = await roleViewReq({ _id });
      if (res.data.code === 200) {
        let resData = res.data.data;
        this.ruleForm = resData;
        let ids = resData.ids;
        this.roleIds = ids;
        if (type === "view") this.tree = resData.tree;
      }
    },

    // 初始化view
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
  async created() {
    if (this.type !== "view") {
      // 获取权限树
      const res = await permissionTreeReq();
      this.tree = res.data.data;
    }

    this.initView();
  }
};
</script>

<style lang='scss'>
</style>
