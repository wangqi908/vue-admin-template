<template>
  <el-dialog title="用户添加" :visible.sync="myShow" :fullscreen="isFullscreen">
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
      <el-form-item label="备注">
        <el-input v-model="ruleForm.remark" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="头像">
        <my-upload @remove="remove" @success="success" :fileList.sync="fileList" ref="upload"></my-upload>
      </el-form-item>
    </el-form>
    <!-- 角色表 -->
    <my-role-table v-model="ruleForm.roleIds" />
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm('ruleForm')">确认</el-button>
      <el-button @click="myShow=false">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { userAddReq } from '@/apis'
import toggleDialogMixin from '@/mixin/toggleDialogMixin'
import MyRoleTable from './MyRoleTable.vue'
import { usernameValidator, passwordValidator } from '@/utils/validator'
export default {
  mixins: [toggleDialogMixin],
  components: { MyRoleTable },

  data() {
    const validateCheckPass = (rule, value, callback) => {
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
      roleList: [], //角色
      ruleForm: {
        username: '',
        password: '',
        checkPass: '',
        remark: '',
        avatar: '',
        roleIds: []
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
          this.handleComfrim()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async handleComfrim() {
      let { ruleForm } = this

      const res = await userAddReq(ruleForm)
      if (res.data.code === 200) {
        this.$message.success('添加成功')
        this.$emit('before-close')
        this.myShow = false
      }
    },
    // 图片删除
    remove() {
      this.ruleForm.avatar = ''
    },
    // 图片上传成功
    success(v) {
      this.ruleForm.avatar = v.fileList[0]
    }
  }
}
</script>
