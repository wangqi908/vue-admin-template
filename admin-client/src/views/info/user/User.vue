<template>
  <div class="user">
    <div class="table-box">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="_id" label="ID" width="100" show-overflow-tooltip></el-table-column>
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column label="注册时间" show-overflow-tooltip>
          <template slot-scope="scope">{{scope.row.createTime|timeFilter}}</template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="130">
          <template slot-scope="scope">
            <el-button type="text" size="small">查看</el-button>
            <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-box">
        <el-pagination
          layout="prev, pager, next"
          :total="total"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </div>
    </div>
    <my-edit :visible.sync="visible_edit" />
  </div>
</template>

<script>
import { formatTime } from "@/utils";
import { userPageReq } from "@/apis";
import { MyEdit } from "./components";
export default {
  components: { MyEdit },
  data() {
    return {
      username: "",
      total: 0, //总数
      pageSize: 6, //每页条数
      pageNum: 0, //当前页
      tableData: [],
      visible_edit: false
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
    // 编辑
    edit(item) {
      console.log(item);
      this.visible_edit = true;
    }
  },
  created() {
    this.getTableData();
  },
  mounted() {},
  computed: {},
  filters: {
    timeFilter(val) {
      return formatTime(val, "all");
    }
  }
};
</script>

<style lang='scss'>
.user {
  .pagination-box {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
