<template>
  <div class="menutree">
    <label v-for="(menu,index) in data" :key="menu.path+index">
      <el-submenu :index="menu.name" v-if="menu.children">
        <template slot="title">
          <i :class="menu.icon"></i>
          <span :class="[isCollapse?'hiden':'']">{{menu.title}}</span>
        </template>
        <label>
          <menutree :data="menu.children"></menutree>
        </label>
      </el-submenu>
      <el-menu-item v-else :index="menu.name">
        <i :class="menu.icon"></i>
        <span slot="title">{{menu.title}}</span>
      </el-menu-item>
    </label>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import menutree from '@/components/menu/Menutree'
export default {
  name: 'menutree',
  components: {
    menutree
  },
  props: ['data'],
  computed: {
    ...mapState(['isCollapse'])
  }
}
</script>

<style lang="scss" >
.el-menu--collapse {
  .hiden {
    display: none;
  }
}
</style>