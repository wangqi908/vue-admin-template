<template>
  <div class="nav-wrap">
    <!-- 侧边栏菜单 -->
    <div v-if="!isShowAside" class='meun-main' :class="[isCollapse?'aside-unactive':'aside-active']">
      <Menu />
    </div>

    <!-- 抽屉菜单 -->
    <div v-else>
      <el-drawer :visible.sync="isShowDrawer" :show-close="false" custom-class="drawer-box" :direction="direction"
        size="200px">
        <Menu />
      </el-drawer>
    </div>

  </div>

</template>

<script>
import { mapState, mapMutations } from "vuex";
import { throttle } from "@/utils";
import Menu from "./Menu.vue";
export default {
  components: { Menu },
  data() {
    return {
      direction: "ltr",
      isShowDrawer: false,
      fullWidth: document.documentElement.clientWidth
    };
  },
  methods: {
    ...mapMutations(["getCollapse", "setShowAside"]),
    initCollapse() {
      // 节流
      window.addEventListener("resize", throttle(this.handleResize, 500));
      let res = this.fullWidth <= this.clientWidth;
      let showAsideWidthRes = this.fullWidth <= this.showAsideWidth;
      this.getCollapse(res);
      this.setShowAside(showAsideWidthRes);
    },
    handleResize(event) {
      this.fullWidth = document.documentElement.clientWidth;
    }
  },
  created() {
    this.initCollapse()
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  },
  watch: {
    fullWidth(val) {
      let res = val <= this.clientWidth;
      let showAsideWidthRes = val <= this.showAsideWidth;
      this.getCollapse(res);
      this.setShowAside(showAsideWidthRes);
    },
    isCollapse(val) {
      this.isShowDrawer = !val;
      this.getCollapse(val);
    },
    isShowDrawer(val) {
      this.getCollapse(!val);
    }
  },
  computed: {
    ...mapState(["isCollapse", "clientWidth", "isShowAside", "showAsideWidth"])
  }
};
</script>

<style lang='scss'>
@import "@/assets/css/index.scss";
.nav-wrap {
  display: flex;
  .meun-main {
    margin: 10px 0 10px 10px;
    overflow: auto;
    border-radius: 4px;
    flex: 1;
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
}
.el-drawer__container .drawer-box {
  height: 100%;
  overflow: auto;
}
</style>