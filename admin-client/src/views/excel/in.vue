<template>
  <div>
    <label for="fileInput">
      <div class="btn">导入表格</div>
    </label>
    <input type="file" ref="upload" @change="readExcel" id="fileInput" accept=".xls, .xlsx" />

    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import XLSX from 'xlsx'
export default {
  data() {
    return {
      tableData: []
    }
  },
  methods: {
    readExcel(e) {
      const files = e.target.files
      if (files.length <= 0) {
        return false
      } else if (!/\.(xls|xlsx)$/.test(files[0].name.toLowerCase())) {
        this.$Message.error('上传格式不正确，请上传xls或者xlsx格式')
        return false
      }

      const fileReader = new FileReader()
      fileReader.onload = ev => {
        try {
          const data = ev.target.result
          const workbook = XLSX.read(data, {
            type: 'binary'
          })
          const wsname = workbook.SheetNames[0] //取第一张表
          const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]) //生成json表格内容
          let outputs = [] //清空接收数据
          ws.forEach(ele => {
            let obj = {
              date: ele['日期'],
              name: ele['姓名'],
              address: ele['地址']
            }
            for (const key in obj) {
              const element = obj[key]
              if (!element) {
                obj[key] = ''
              }
            }
            let isObjValueAllEmpty = Object.values(obj).every(v => v === '') //判断对象的值全为空
            if (!isObjValueAllEmpty) outputs.push(obj)
          })
          this.tableData = outputs
          this.$refs.upload.value = ''
        } catch (e) {
          console.log(e)
          return false
        }
      }
      fileReader.readAsBinaryString(files[0])
    }
  }
}
</script>
<style lang='scss'>
.btn {
  color: #12a9ee;
  font-size: 12px;
  padding: 10px 4px;
  width: fit-content;
  &:hover {
    cursor: pointer;
    color: #36b6f1;
  }
  &:active {
    color: rgb(32, 167, 230);
  }
}
input {
  display: none;
}
</style>
