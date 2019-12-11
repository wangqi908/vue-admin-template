<template>
  <div class='my-menu-content'>

    <el-menu :collapse="isCollapse" :default-active="activePath" @select="handleSelect" :collapse-transition="false"
      :unique-opened="true">
      <div v-for="item in menuList" :key="item.meta.title">

        <el-menu-item :index="item.meta.url" v-if="!item.children">
          <i class="el-icon-s-home"></i>
          <span slot="title">{{item.meta.title}}</span>
        </el-menu-item>

        <el-submenu :index="item.meta.url" v-if="item.children">
          <template slot="title">
            <i :class="[item.meta.icon]"></i>
            <span slot="title" v-show="!isCollapse">{{item.meta.title}}</span>
          </template>

          <div v-for="subItem in item.children" :key="subItem.meta.title">
            <el-menu-item :index="subItem.meta.url">
              <span slot="title">{{subItem.meta.title}}</span>
            </el-menu-item>
          </div>

        </el-submenu>

      </div>
    </el-menu>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      activePath: ""
    };
  },
  methods: {
    ...mapMutations(["getCollapse"]),
    toggleShowMeun() {
      let isCollapse = !this.isCollapse;
      this.getCollapse(isCollapse);
    },
    handleSelect(path, keyPath) {
      this.$router.push(path);
      this.activePath = path;
    }
  },
  created() {
    let activePath = this.$route.meta.modulePath || this.$route.path;
    this.activePath = activePath;
  },
  watch: {
    $route(to, from) {
      let path = this.$route.meta.modulePath;
      this.activePath = path ? path : to.path; //让侧边菜单高亮
    }
  },
  computed: {
    ...mapState(["isCollapse", "menuList"])
  }
};
</script>

<style lang='scss'>
@import "@/assets/css/index.scss";
.my-menu-content {
  height: 100%;

  .meun-icon {
    width: 40px;
    height: 40px;
  }

  .isActive {
    font-size: 18px;
    margin: 30px 0 0 10px;
    transform: rotate(180deg);
  }

  .el-menu {
    border-right: 0;
    height: 100%;
  }

  .is-active {
    color: #{$mainColor};
    .el-submenu__title,
    i {
      color: #{$mainColor};
    }
  }
  .is-active {
    .el-submenu__title {
      border-right: 4px solid #{$mainColor};
    }
  }
  .el-submenu .el-menu-item {
    min-width: unset;
  }
}
</style>
