<template>
  <div class='user'>
    <div class="table-box">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="_id" label="ID" width="100" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="username" label="姓名">
        </el-table-column>
        <el-table-column label="注册时间" show-overflow-tooltip>
          <template slot-scope="scope">
            {{scope.row.createTime|timeFilter}}
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width=130>
          <template slot-scope="scope">
            <el-button type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { formatTime } from "@/utils";
import { userPageReq } from "@/apis";
export default {
  components: {},
  data() {
    return {
      username: "",
      tableData: []
    };
  },
  methods: {
    async getTableData() {
      let { username } = this;
      let sendData = {
        pageSize: 5,
        pageNum: 0,
        data: {
          username
        }
      };
      const res = await userPageReq(sendData);
      if (res.data.code === 200) {
        let resData = res.data.data;
        this.tableData = resData.list;
      }
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
  p {
    border: 1px solid #000;
    padding: 30px;
  }
  .bigBox {
    border: 1px solid rgb(211, 60, 60);
    display: flex;
    flex-wrap: wrap;
    .box {
      width: 100px;
      height: 100px;
      margin: 10px;
      background-color: rgb(123, 198, 248);
    }
  }
}
</style>
