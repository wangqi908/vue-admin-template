<template>
  <el-dialog title="用户查看" :visible.sync="myShow" :fullscreen="isFullscreen">
    <el-form :model="ruleForm" status-icon label-width="100px">
      <el-form-item label="用户名" prop="username">{{ruleForm.username}}</el-form-item>
      <el-form-item label="备注">{{ruleForm.remark}}</el-form-item>
      <el-form-item label="头像" v-if="fileList.length">
        <my-upload :fileList.sync="fileList" disabled></my-upload>
      </el-form-item>
    </el-form>
    <!-- 角色表 -->
    <my-role-table v-model="ruleForm.roleIds" type="view" v-if="loadFlag" />
  </el-dialog>
</template>

<script>
import { userViewReq } from '@/apis'
import toggleDialogMixin from '@/mixin/toggleDialogMixin'
import MyRoleTable from './MyRoleTable.vue'
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
      loadFlag: false,
      fileList: [],
      ruleForm: {
        username: '',
        remark: '',
        avatar: '',
        roleIds: []
      }
    }
  },
  methods: {
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
  }
}
</script>
