<template>
  <div class=''>
    <button @click="handleDownload">下载</button>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      list: [
        {
          id: "1",
          title: "1",
          author: "1",
          pageviews: "1",
          display_time: "1"
        }
      ]
    };
  },
  methods: {
    handleDownload() {
    import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['Id', 'Title', 'Author', 'Readings', 'Date']
        const filterVal = ['id', 'title', 'author', 'pageviews', 'display_time']
        const list = this.list
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.filename,
          autoWidth: this.autoWidth,
          bookType: this.bookType
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    }
  },
  created() {},
  mounted() {},
  computed: {},
  watch: {}
};
</script>

<style lang='scss'>
</style>
