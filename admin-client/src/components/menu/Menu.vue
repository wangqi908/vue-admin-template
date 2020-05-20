<template>
  <div class="menu-box">
    <div>
      <i :class="['el-icon-s-unfold',isCollapse?'add-rotate':'']" @click="setMeueCollapseByBtn"></i>
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
import { throttle } from '@/utils'
import config from '../../../package'
export default {
  components: {
    menutree
  },
  data() {
    return {
      activeRouterName: '',
      switchValue: ''
    }
  },
  methods: {
    ...mapMutations(['setCollapse']),
    handleSelect(routerName) {
      this.$router.push({ name: routerName })
      this.activeRouterName = routerName
    },

    setMeueCollapse(clientWidth) {
      this.setCollapse(clientWidth < 1000)
    },

    setMeueCollapseByBtn() {
      this.setCollapse(!this.isCollapse)
    },

    getClientWidth() {
      window.addEventListener(
        'resize',
        throttle(() => {
          this.setMeueCollapse(document.body.clientWidth)
        }, 100)
      )
    }
  },
  created() {
    this.activeRouterName = this.$route.meta.parentName || this.$route.name
    this.setMeueCollapse(document.body.clientWidth)
  },

  mounted() {
    this.getClientWidth()
  },
  watch: {
    $route(to) {
      this.activeRouterName = to.meta.parentName || to.name
    },
    switchValue(val) {
      this.setCollapse(!val)
    },
    isCollapse(val) {
      this.switchValue = !val
    }
  },
  computed: {
    ...mapState(['isCollapse', 'menu']),
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
    background-color: #2d2c41;
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
      background-color: rgba(125, 125, 232, 0.2);
    }
  }
  .el-menu:not(.el-menu--collapse) {
    width: 200px;
    border-right: 0;
  }
  .no-arrow {
    .el-icon-arrow-right {
      display: none;
    }
  }
  .el-icon-s-unfold {
    color: rgb(112, 112, 112);
    margin: 0 0 20px 20px;
    padding: 4px;
    transition: all 0.5s;
    &:hover {
      cursor: pointer;
      background-color: rgba(172, 172, 172, 0.4);
      color: rgb(141, 141, 141);
    }
    &:active {
      background-color: rgb(122, 122, 122);
      color: #fff;
    }
  }
  .add-rotate {
    transform: rotate(180deg);
    transition: all 0.5s;
  }
  .version {
    font-size: 12px;
    margin-bottom: 20px;
    color: rgb(122, 122, 122);
  }
}
</style>
