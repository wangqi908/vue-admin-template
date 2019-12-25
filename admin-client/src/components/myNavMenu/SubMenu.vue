<template functional>
  <el-submenu :index="props.data.url">
    <template slot="title">
      <i :class="props.data.icon"></i>
      <span>{{props.data.name}}</span>
    </template>
    <template v-for="item in props.data.children">
      <router-link :to="item.url" :key="item.url" v-if="item.children.length===0">
        <el-menu-item class="subitem" :index="item.url">
          <i :class="item.icon"></i>
          <span slot="title">{{item.name}}</span>
        </el-menu-item>
      </router-link>
      <sub-menu v-else :data="item" :key="item.url"></sub-menu>
    </template>
  </el-submenu>
</template>

<script>
export default {
  name: "submenu",
  props: {
    data: [Array, Object]
  }
};
</script>

<style lang="scss" scoped>
.el-submenu {
  .el-menu-item {
    padding: 0;
  }
}
</style>