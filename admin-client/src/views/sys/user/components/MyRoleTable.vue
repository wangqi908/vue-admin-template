<template>
  <div class="my-table">
    <el-table
      ref="multipleTable"
      :data="tableList"
      tooltip-effect="dark"
      style="width: 100%"
      max-height="500px"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" v-if="!type"></el-table-column>
      <el-table-column prop="name" label="名称" width="120"></el-table-column>
      <el-table-column prop="remark" label="备注" show-overflow-tooltip></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { roleListReq } from '@/apis'
export default {
  props: {
    roleIds: Array,
    type: String
  },
  model: {
    prop: 'roleIds',
    event: 'change'
  },
  data() {
    return {
      tableList: [],
      multipleSelection: []
    }
  },
  methods: {
    // 获取角色
    async getRoleList() {
      let { roleIds, type } = this
      const res = await roleListReq({})
      if (res.data.code === 200) {
        let roleList = res.data.data
        if (type) {
          roleList.forEach(item => {
            roleIds.forEach(_id => {
              if (item._id === _id) {
                this.tableList.push(item)
              }
            })
          })
          return
        }
        this.tableList = roleList
        this.setRoleList()
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val.map(ele => ele._id)
    },
    // 设置角色回显
    async setRoleList() {
      let roleIds = this.roleIds
      roleIds.forEach(ele => {
        let index = this.tableList.findIndex(item => item._id === ele)
        this.$nextTick(() => {
          this.$refs.multipleTable.toggleRowSelection(this.tableList[index])
        })
      })
    }
  },
  created() {
    this.getRoleList()
  },
  watch: {
    multipleSelection(val) {
      this.$emit('change', val)
    }
  }
}
</script>
