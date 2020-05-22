<template>
  <div class="menu-box">
    <div>
      <el-menu
        :class="['el-menu',isCollapse?'no-arrow':'']"
        :collapse="isCollapse"
        :default-active="activeRouterName"
        @select="handleSelect"
      >
        <menutree :data="menu"></menutree>
      </el-menu>
    </div>

    <div class="version">
      <span v-if="!isCollapse">Version:</span>
      <span>{{version}}</span>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import menutree from '@/components/menu/Menutree'
import config from '../../../package'
export default {
  components: {
    menutree
  },
  data() {
    return {
      activeRouterName: ''
    }
  },
  methods: {
    ...mapMutations('menuStore', ['setDrawer']),
    handleSelect(routerName) {
      if (this.isShowDrawer) this.setDrawer(false)
      this.$router.push({ name: routerName })

      this.activeRouterName = routerName
    }
  },
  created() {
    this.activeRouterName = this.$route.meta.parentName || this.$route.name
  },

  watch: {
    $route(to) {
      this.activeRouterName = to.meta.parentName || to.name
    }
  },
  computed: {
    ...mapState('menuStore', ['isCollapse', 'menu', 'isShowDrawer']),
    version() {
      return config.version
    }
  }
}
</script>

<style lang='scss'>
.menu-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  justify-content: space-between;
  .el-menu {
    background-color: #273952;
    border: 0;
    .menutree {
      .el-submenu__title,
      .el-menu-item {
        color: rgb(201, 201, 201);
      }

      .is-active {
        color: #409eff;
      }
    }

    .el-menu-item:active,
    .el-menu-item:hover,
    .el-menu-item:focus,
    .el-submenu__title:focus,
    .el-submenu__title:active,
    .el-submenu__title:hover {
      background-color: #38556a;
    }
  }
  .el-menu:not(.el-menu--collapse) {
    width: 210px;
    border-right: 0;
  }
  .no-arrow {
    .el-icon-arrow-right {
      display: none;
    }
  }
  .version {
    font-size: 12px;
    margin-bottom: 20px;
    color: rgb(122, 122, 122);
  }
}
</style>
