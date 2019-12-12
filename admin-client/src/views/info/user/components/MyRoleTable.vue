<template>
  <div class='my-table'>
    <el-table ref="multipleTable" :data="list" tooltip-effect="dark" style="width: 100%" height="500px"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55">
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
    roleIds: Array
  },
  model: {
    prop: "roleIds",
    event: "change"
  },
  data() {
    return {
      list: [],
      multipleSelection: this.roleIds
    };
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val.map(ele => ele._id);
    },
    async getList() {
      const res = await roleListReq({});
      if (res.data.code === 200) {
        let roleIds = this.multipleSelection;
        let list = res.data.data;
        this.list = list;
        roleIds.forEach(ele => {
          let index = list.map(ele => ele._id).indexOf(ele);
          this.$nextTick(() => {
            this.$refs.multipleTable.toggleRowSelection(this.list[index]);
          });
        });
      }
    }
  },
  created() {
    this.getList();
  },
  mounted() {},
  computed: {},
  watch: {
    multipleSelection(val) {
      this.$emit("change", val);
    }
  }
};
</script>

<style lang='scss'>
</style>
