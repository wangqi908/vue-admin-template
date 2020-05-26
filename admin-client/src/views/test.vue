<template>
  <div>
    <el-button-group>
      <el-button type="primary" @click="changeRole('super')">超级管理员</el-button>
      <el-button type="primary" @click="changeRole('test')">路人甲</el-button>
    </el-button-group>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { routesConfig } from '@/router/config'
import { userEditReq } from '@/apis'
export default {
  data() {
    return {}
  },
  methods: {
    ...mapActions(['getUserInfoAction']),
    async changeRole(val) {
      let role =
        val === 'super'
          ? '5ec249d21358c41ea85be7cf'
          : '5ec3314fe25b6c25f84afd18'
      let sendData = {
        _id: this.userInfo._id,
        roleIds: [role]
      }

      const res = await userEditReq(sendData)
      if (res.data.code === 200) {
        this.$message.success('修改成功')
        this.getUserInfoAction().then(() => {
          routesConfig()
        })
      }
    }
  },
  computed: {
    ...mapState(['userInfo'])
  }
}
</script>
