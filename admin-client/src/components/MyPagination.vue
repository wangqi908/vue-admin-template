<template>
  <div class="pagination-box">
    <el-pagination
      :layout="layout"
      :total="total"
      :page-size="pageSize"
      :current-page.sync="myCurrentPage"
      @current-change="handleCurrentChange"
    ></el-pagination>
  </div>
</template>

<script>
import store from '@/store'
export default {
  props: {
    layout: {
      type: String,
      default: 'total, prev, pager, next, jumper'
    },
    total: {
      type: [String, Number],
      default: 100,
      required: true
    },
    pageSize: {
      type: [String, Number],
      default: () => store.state.pageSize
    },
    currentPage: {
      type: [String, Number],
      default: 1
    }
  },
  data() {
    return {
      myCurrentPage: this.currentPage
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.$emit('current-change', val)
    }
  },
  watch: {
    currentPage(val) {
      this.myCurrentPage = val
    },
    myCurrentPage(val) {
      this.$emit('update:currentPage', val)
    }
  }
}
</script>

<style lang="scss" >
.pagination-box {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  .el-pagination,
  .el-pager {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>