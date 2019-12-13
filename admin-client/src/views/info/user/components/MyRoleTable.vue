<template>
  <div class='my-table'>
    <el-table ref="multipleTable" :data="tableList" tooltip-effect="dark" style="width: 100%" max-height="500px"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" v-if="type !== 'view'">
      </el-table-column>
      <el-table-column prop="name" label="名称" width="120">
      </el-table-column>
      <el-table-column prop="remark" label="备注" show-overflow-tooltip>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { roleListReq } from "@apis";
export default {
  props: {
    roleIds: Array,
    roles: Array,
    type: String,
    list: Array
  },
  model: {
    prop: "roleIds",
    event: "change"
  },
  data() {
    return {
      tableList: this.list,
      multipleSelection: this.roleIds
    };
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val.map(ele => ele._id);
    },
    // 设置角色回显
    async setRoleList() {
      let roleIds = this.multipleSelection;
      let list = this.list;
      roleIds.forEach(ele => {
        let index = list.map(ele => ele._id).indexOf(ele);
        this.$nextTick(() => {
          this.$refs.multipleTable.toggleRowSelection(this.list[index]);
        });
      });
    }
  },
  created() {
    if (this.type !== "view") {
      this.setRoleList();
    }
  },
  watch: {
    multipleSelection(val) {
      this.$emit("change", val);
    },
    roles(val){
     this.tableList = this.roles;
    }
  }
};
</script>

<style lang='scss'>
</style>
