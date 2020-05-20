<template>
  <el-dialog title="角色修改" :visible.sync="myShow">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px">
      <el-form-item label="角色名" prop="name">
        <el-input v-model="ruleForm.name" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="备注">
        <el-input v-model="ruleForm.remark" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="权限树">
        <el-tree
          ref="tree"
          :data="tree"
          default-expand-all
          node-key="_id"
          :props="defaultProps"
          :default-checked-keys="roleIds"
          show-checkbox
        ></el-tree>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm('ruleForm')">确认</el-button>
      <el-button @click="myShow=false">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { routesConfig } from '@/router/config'
import { mapActions } from 'vuex'
import { permissionTreeReq, roleEditReq, roleViewReq } from '@/apis'
import toggleDialogMixin from '@/mixin/toggleDialogMixin'
import { roleNameValidator } from '@/utils/validator'
export default {
  mixins: [toggleDialogMixin],
  props: {
    _id: {
      type: [Number, String],
      required: true
    }
  },
  data() {
    return {
      ruleForm: {
        name: '',
        remark: ''
      },
      rules: {
        name: roleNameValidator
      },
      tree: [], //权限树
      roleIds: [], //权限ids
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  methods: {
    ...mapActions(['getUserInfoAction']),
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.handleComfrim()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async handleComfrim() {
      let { ruleForm } = this
      let sendData = {
        ...ruleForm,
        ids: this.$refs.tree.getCheckedKeys()
      }
      const res = await roleEditReq(sendData)
      if (res.data.code === 200) {
        this.$message.success('修改成功')
        this.$emit('before-close')

        this.getUserInfoAction().then(() => {
          routesConfig()
        })
        this.myShow = false
      }
    },

    // 获取权限树
    async getTree() {
      const res = await permissionTreeReq()
      this.tree = res.data.data
    },

    // 获取信息
    async getInfo() {
      let { _id } = this
      const res = await roleViewReq({ _id })
      if (res.data.code === 200) {
        let resData = res.data.data
        this.ruleForm = resData
        this.roleIds = resData.ids
      }
    }
  },
  created() {
    this.getTree()
    this.getInfo()
  }
}
</script>
