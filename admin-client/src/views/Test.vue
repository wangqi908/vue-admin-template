<template>
  <div class="download_btn">
    <button @click="exportExcel">导出表格</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      list: [
        {
          name: "韩版设计时尚风衣大",
          number: "MPM00112",
          salePrice: "￥999.00",
          stockNum: 3423
        },
        {
          name: "韩版设计时尚风衣大11",
          number: "MPM00112",
          salePrice: "￥999.00",
          stockNum: 3423
        }
      ]
    };
  },
  methods: {
    jsonToExcel(params) {
      let { list, header, keys, excelName } = params;
      this.loading = true; // 设置一个loading，生成Excel需要时间
      import("@/vendor/Export2Excel.js").then(excel => {
        if (list) {
          const data = this.formatJson(keys, list);
          excel.export_json_to_excel({
            // 调用excel方法生成表格
            header,
            data,
            filename: excelName
          });
        } else {
          alert("暂无无数据");
        }
        this.loading = false;
      });
    },
    exportExcel() {
      let { list } = this;
      const header = ["商品名称", "商品货号", "售价", "库存"];
      const keys = ["name", "number", "salePrice", "stockNum"];
      const excelName = "商品管理列表";
      let params = {
        list,
        header,
        keys,
        excelName
      };
      this.jsonToExcel(params);
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    }
  }
};
</script>

<style>
.download_btn {
  margin: 10px;
}
.download_btn button {
  display: inline-block;
  background: #f5a623;
  border: 1px solid #f5a623;
  border-radius: 4px;
  padding: 8px 12px;
  overflow: hidden;
  color: #fff;
  font-size: 14px;
}
.download_btn button:hover {
  background: #f7c16a;
  border-color: #f5cb87;
  color: #fff;
  cursor: pointer;
}
</style>