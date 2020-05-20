<template>
  <el-dialog title="用户修改" :visible.sync="myShow">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="ruleForm.remark" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="头像">
        <my-upload @remove="remove" @success="success" :fileList.sync="fileList" ref="upload"></my-upload>
      </el-form-item>
    </el-form>
    <!-- 角色表 -->
    <my-role-table v-model="ruleForm.roleIds" v-if="loadFlag" />
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm('ruleForm')">确认</el-button>
      <el-button @click="myShow=false">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { routesConfig } from '@/router/config'
import { userEditReq, userViewReq } from '@/apis'
import toggleDialogMixin from '@/mixin/toggleDialogMixin'
import MyRoleTable from './MyRoleTable.vue'
import { usernameValidator } from '@/utils/validator'
export default {
  mixins: [toggleDialogMixin],
  components: { MyRoleTable },
  props: {
    _id: {
      type: [Number, String],
      required: true
    }
  },

  data() {
    return {
      fileList: [],
      roleList: [], //角色
      loadFlag: false,
      ruleForm: {
        username: '',
        remark: '',
        avatar: '',
        roleIds: []
      },
      rules: {
        username: usernameValidator
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
      let { ruleForm, userInfo, _id } = this

      const res = await userEditReq(ruleForm)
      if (res.data.code === 200) {
        this.$message.success('修改成功')
        if (_id === userInfo._id) {
          this.getUserInfoAction().then(() => {
            routesConfig()
          })
        }
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
    },

    async getInfo() {
      let { _id } = this
      const res = await userViewReq({ _id })
      if (res.data.code === 200) {
        this.loadFlag = true
        let resData = res.data.data
        if (resData.avatar) {
          this.fileList = [
            {
              http: resData.http,
              url: resData.avatar
            }
          ]
        }
        this.ruleForm = resData
      }
    }
  },
  created() {
    this.getInfo()
  },
  computed: {
    ...mapState(['userInfo'])
  }
}
</script>
