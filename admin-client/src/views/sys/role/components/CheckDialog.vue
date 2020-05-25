<template>
  <el-dialog title="角色查看" :visible.sync="myShow" :fullscreen="isFullscreen">
    <el-form :model="ruleForm" status-icon label-width="100px">
      <el-form-item label="角色名">{{ruleForm.name}}</el-form-item>

      <el-form-item label="备注">{{ruleForm.remark}}</el-form-item>

      <el-form-item label="权限树">
        <el-tree
          ref="tree"
          :data="tree"
          default-expand-all
          node-key="_id"
          :props="defaultProps"
          :default-checked-keys="roleIds"
        ></el-tree>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { roleViewReq } from '@/apis'
import toggleDialogMixin from '@/mixin/toggleDialogMixin'
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

      tree: [], //权限树
      roleIds: [], //权限ids
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  methods: {
    // 获取信息
    async getInfo() {
      let { _id } = this
      const res = await roleViewReq({ _id })
      if (res.data.code === 200) {
        let resData = res.data.data
        this.ruleForm = resData
        this.roleIds = resData.ids
        this.tree = resData.tree
      }
    }
  },
  created() {
    this.getInfo()
  }
}
</script>
