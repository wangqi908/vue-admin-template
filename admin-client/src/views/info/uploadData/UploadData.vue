<template>
  <div class="user">
    <div class="table-box">
      <div class="btn-box">
        <div class="upload-excel">
          <span>导入数据</span>
          <input type="file" ref="upload" @change="readExcel" accept=".xls,.xlsx">
        </div>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="_id" label="ID" width="100" show-overflow-tooltip></el-table-column>
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column label="注册时间" show-overflow-tooltip>
          <template slot-scope="scope">{{scope.row.createTime}}</template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import XLSX from 'xlsx'
export default {
  data() {
    return {
      tableData: []
    };
  },
  methods: {
    readExcel(e) {
      const files = e.target.files;
      if (files.length <= 0) {
        return false;
      } else if (!/\.(xls|xlsx)$/.test(files[0].name.toLowerCase())) {
        this.$Message.error("上传格式不正确，请上传xls或者xlsx格式");
        return false;
      }

      const fileReader = new FileReader();
      fileReader.onload = ev => {
        try {
          const data = ev.target.result;
          const workbook = XLSX.read(data, {
            type: "binary"
          });
          const wsname = workbook.SheetNames[0]; //取第一张表
          const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]); //生成json表格内容
          let outputs = []; //清空接收数据
          ws.forEach((ele, index) => {
            let obj = {
              _id: ele["id"],
              username: ele["用户名"],
              createTime: ele["注册时间"],
              remark: ele["备注"]
            };
            for (const key in obj) {
              const element = obj[key];
              if (!element) {
                obj[key] = "";
              }
            }
            let isObjValueAllEmpty = Object.values(obj).every(v => v === ""); //判断对象的值全为空
            if (!isObjValueAllEmpty) outputs.push(obj);
          });
          console.log(outputs);
          this.tableData = outputs;
          this.$refs.upload.value = "";
        } catch (e) {
          console.log(e);
          return false;
        }
      };
      fileReader.readAsBinaryString(files[0]);
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

  .upload-excel {
    position: relative;
    display: inline-block;
    background: #f5a623;
    border: 1px solid #f5a623;
    border-radius: 4px;
    padding: 8px 12px;
    overflow: hidden;
    color: #fff;
    font-size: 14px;
    margin: 10px;
  }

  input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
  }
  .upload-excel:hover {
    background: #f7c16a;
    border-color: #f5cb87;
    color: #fff;
  }
  .upload-excel input:hover {
    cursor: pointer;
  }
}
</style>
