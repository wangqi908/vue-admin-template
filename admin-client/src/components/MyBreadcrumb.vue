<template>
  <div class="breadcrumb" ref="breadcrumb">
    <transition-group name="breadcrumb">
      <div
        class="item flex-center"
        v-for="(item,index) in breadcrumbList"
        :key="item.title"
        @click="go(item)"
      >
        <p class="title">{{item.title}}</p>
        <p class="cut" v-if="index!==breadcrumbList.length-1">/</p>
      </div>
    </transition-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      breadcrumbList: []
    }
  },
  methods: {
    go(item) {
      let isFrist = this.breadcrumbList.length + item.go === 1
      if (isFrist || item.go === 0) return
      this.$router.go(item.go)
    },
    initBreadcrumbList() {
      let matched = this.$router.history.current.matched
      let breadcrumbList = this.$router.history.current.meta.breadcrumb
      // 整理面包屑
      matched = matched.filter(ele => ele.meta.title)
      let routerList = matched.map((ele, index) => {
        let len = matched.length
        return {
          title: ele.meta.title,
          go: index + 1 - len
        }
      })
      this.breadcrumbList = breadcrumbList || routerList
    }
  },
  watch: {
    $route() {
      this.initBreadcrumbList()
    }
  },
  created() {
    this.initBreadcrumbList()
  }
}
</script>

<style lang='scss'>
.breadcrumb {
  padding: 10px;
  background-color: #fff;
  span {
    display: flex;
    .item {
      color: rgb(99, 99, 99);
      font-size: 14px;
    }
    .cut {
      margin: 0 4px;
    }
  }
}
</style>
