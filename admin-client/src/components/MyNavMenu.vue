<template>
  <!-- 
  侧边栏菜单
 -->
  <div class='meun-main' :class="[isCollapse?'aside-unactive':'aside-active']">
    <i :class="['el-icon-right','flex-center','meun-icon',isCollapse?'isActive':'']" @click="toggleShowMeun"></i>
    <el-menu :collapse="isCollapse" :default-active="activePath" @select="handleSelect" :collapse-transition="false"
      :unique-opened="true">
      <div v-for="item in navList" :key="item.name">

        <el-menu-item :index="item.path" v-if="!item.children">
          <i class="el-icon-s-home"></i>
          <span slot="title">{{item.name}}</span>
        </el-menu-item>

        <el-submenu :index="item.path" v-if="item.children">
          <template slot="title">
            <i :class="[item.icon]"></i>
            <span slot="title" v-show="!isCollapse">{{item.name}}</span>
          </template>

          <div v-for="subItem in item.children" :key="subItem.name">
            <el-menu-item :index="subItem.path">
              <span slot="title">{{subItem.name}}</span>
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
      activePath: "",
      navList: [
        {
          name: "首页",
          icon: "el-icon-s-home",
          path: "/index",
          children: null
        },
        {
          name: "信息",
          icon: "el-icon-menu",
          path: "/info",
          children: [
            {
              name: "用户管理",
              path: "/info/user"
            },
            {
              name: "数据上传",
              path: "/info/uploadData"
            }
          ]
        }
      ],
      fullWidth: document.documentElement.clientWidth
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
    },
    handleResize(event) {
      this.fullWidth = document.documentElement.clientWidth;
    },
    initCollapse() {
      window.addEventListener("resize", this.handleResize);
      let res = this.fullWidth <= this.clientWidth;
      this.getCollapse(res);
    }
  },
  created() {
    let activePath = this.$route.meta.modulePath || this.$route.path;
    this.activePath = activePath;
    this.initCollapse();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  },
  watch: {
    $route(to, from) {
      let path = this.$route.meta.modulePath;
      this.activePath = path ? path : to.path; //让侧边菜单高亮
    },
    fullWidth(val) {
      let res = val <= this.clientWidth;
      this.getCollapse(res);
    }
  },
  computed: {
    ...mapState(["isCollapse", "clientWidth"])
  }
};
</script>

<style lang='scss'>
@import "@/assets/css/index.scss";
.meun-main {
  margin: 10px 0 10px 10px;
  overflow: auto;
  border-radius: 4px;
  .meun-icon {
    width: 40px;
    height: 40px;
  }
  .el-icon-right {
    font-size: 40px;
    transform: rotate(0deg);
    margin: 30px 0 0 20px;
    transition: all 0.28s;
    &:hover {
      cursor: pointer;
    }
  }
  .isActive {
    font-size: 18px;
    margin: 30px 0 0 10px;
    transform: rotate(180deg);
  }
  .el-submenu__icon-arrow {
    display: none;
  }
}

.el-menu {
  border-right: 0;
}
.aside-active {
  width: 180px;
  transition: width 0.28s;
  background-color: #fff;
}
.aside-unactive {
  width: 65px;
  transition: width 0.28s;
  background-color: #fff;
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
</style>
