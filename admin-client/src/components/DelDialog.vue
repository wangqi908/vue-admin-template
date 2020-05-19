<template>
  <el-dialog title="删除" :visible.sync="myShow" width="30%" top="10vh">
    <div class="del-content">
      <span>确认删除!</span>
      <div class="footer">
        <el-button @click="confirm">提交</el-button>
        <el-button @click="myShow=false">取消</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import toggleDialogMixin from '@/mixin/toggleDialogMixin'
export default {
  mixins: [toggleDialogMixin],
  props: {
    title: {
      default: '提示'
    },
    req: {
      type: Function
    },
    ids: {
      type: Array,
      required: true
    }
  },

  methods: {
    async confirm() {
      let ids = this.ids.map(ele => ele._id)
      let sendData = { ids }
      if (!sendData) return

      const res = await this.req(sendData)
      if (res.data.code == 200) {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this.$emit('before-close')
        this.myShow = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.del-content {
  margin: 10px;
  .footer {
    margin-top: 20px;
  }
}
</style>