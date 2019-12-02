<template>
  <div class="user">
    <div class="table-box">
      <div class="btn-box">
        <el-button type="text" size="small" @click="handleInfo(null,'add')">添加用户</el-button>
        <el-button type="text" size="small" @click="remove">删除用户</el-button>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="_id" label="ID" width="100" show-overflow-tooltip></el-table-column>
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column label="注册时间" show-overflow-tooltip>
          <template slot-scope="scope">{{scope.row.createTime|timeFilter}}</template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="130">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleInfo(scope.row,'view')">查看</el-button>
            <el-button type="text" size="small" @click="handleInfo(scope.row,'edit')">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-box">
        <el-pagination layout="prev, pager, next" :total="total" @current-change="handleCurrentChange"></el-pagination>
      </div>
    </div>
    <my-info-dialog v-if="visible" :visible.sync="visible" :_id="activeId" :type="type" @before-close="handleClose" />
  </div>
</template>

<script>
import { formatTime } from "@/utils";
import { userPageReq } from "@/apis";
import { MyInfoDialog } from "./components";
export default {
  components: { MyInfoDialog },
  data() {
    return {
      username: "",
      total: 0, //总数
      pageSize: 6, //每页条数
      pageNum: 0, //当前页
      tableData: [],
      visible: false,
      activeId: "", //当前id
      type: "" //当前弹框类型
    };
  },
  methods: {
    // 点击分页
    handleCurrentChange(v) {
      this.pageNum = v - 1;
      this.getTableData();
    },

    // 获取数据
    async getTableData() {
      let { username, pageSize, pageNum } = this;
      let sendData = {
        pageSize,
        pageNum,
        data: {
          username
        }
      };
      const res = await userPageReq(sendData);
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
      console.log(111);
    }
  },
  created() {
    this.getTableData();
  },
  filters: {
    timeFilter(val) {
      return formatTime(val, "all");
    }
  }
};
</script>

<style lang='scss'>
.user {
  .pagination-box,
  .btn-box {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
