<template>
  <div class=''>
    <p>menu1-1</p>
    <router-link to="/nested/menu1/menu1-1/info">
      <el-button>查看详情</el-button>
    </router-link>
    <div class="breadcrumb">
      <div class="item" v-for="(item, index) in breadcrumbList" :key="index" @click="go(item)">
        <span>{{item.title}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      breadcrumbList: []
    };
  },
  methods: {
    go(item) {
      if (item.hasSubMenu) return;
      console.log(item);
    }
  },
  created() {
    let routerList = this.$router.history.current.matched;
    // 整理面包屑
    let breadcrumbList = routerList.map((ele, index) => {
      let len = routerList.length;
      return {
        path: ele.path,
        title: ele.meta.title,
        hasSubMenu: ele.meta.hasSubMenu ? true : false,
        go: index - len
      };
    });
    this.breadcrumbList = breadcrumbList;

    console.log(breadcrumbList);
  },
  mounted() {},
  computed: {},
  watch: {}
};
</script>

<style lang='scss'>
.breadcrumb {
  display: flex;
  .item {
    border: 1px solid #000;
    margin-right: 10px;
  }
}
</style>
