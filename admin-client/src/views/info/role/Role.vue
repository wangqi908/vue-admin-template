<template>
  <div class="role">
    <div class="table-box">
      <div class="btn-box">
        <el-button type="text" size="small" @click="handleInfo(null,'add')">添加角色</el-button>
        <el-button type="text" size="small" @click="remove">删除角色</el-button>
      </div>
      <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="_id" label="ID" width="100" show-overflow-tooltip></el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column fixed="right" label="操作" width="130">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleInfo(scope.row,'view')">查看</el-button>
            <el-button type="text" size="small" @click="handleInfo(scope.row,'edit')">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-box">
        <el-pagination layout="prev, pager, next" :total="total" :page-size="pageSize"
          @current-change="handleCurrentChange"></el-pagination>
      </div>
    </div>
    <!-- 操作信息对话框 -->
    <my-info-dialog v-if="visible" :visible.sync="visible" :_id="activeId" :type="type" @before-close="handleClose" />
    <!-- 删除对话框 -->
    <my-remove-dialog v-if="visible_remove" :visible.sync="visible_remove" :ids="ids" @before-close="handleClose" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import { rolePageReq } from "@/apis";
import { MyInfoDialog, MyRemoveDialog } from "./components";
export default {
  components: { MyInfoDialog, MyRemoveDialog },
  data() {
    return {
      total: 0, //总数
      pageNum: 0, //当前页
      tableData: [],
      multipleSelection: [], //多选
      ids: [], //多选id
      visible: false, //操作信息对话框
      visible_remove: false, //删除对话框
      activeId: "", //当前id
      type: "" //当前弹框类型
    };
  },
  methods: {
    // 多选
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 点击分页
    handleCurrentChange(v) {
      this.pageNum = v - 1;
      this.getTableData();
    },

    // 获取数据
    async getTableData() {
      let { pageSize, pageNum } = this;
      let sendData = {
        pageSize,
        pageNum
      };
      const res = await rolePageReq(sendData);
      if (res.data.code === 200) {
        let resData = res.data.data;
        this.total = resData.count;
        this.tableData = resData.list;
      }
    },

    // 处理增删改查
    handleInfo(item, type) {
      this.visible = true;
      this.activeId = item ? item._id : "";
      this.type = type;
    },

    // 操作成功
    handleClose() {
      this.getTableData();
    },

    remove() {
      let { multipleSelection } = this;
      if (multipleSelection.length === 0) {
        this.$message.warning("请先选择要删除的角色");
        return;
      }
      let ids = multipleSelection.map(ele => ele._id);
      this.ids = ids;
      this.visible_remove = true;
    }
  },
  created() {
    this.getTableData();
  },
  computed: {
    ...mapState(["pageSize"])
  }
};
</script>

<style lang='scss'>
.role {
  .pagination-box,
  .btn-box {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
