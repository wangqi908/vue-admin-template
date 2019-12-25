<template>
  <div class="menu">
    <el-menu :default-active="activePath" :collapse="isCollapse" :collapse-transition="false" :unique-opened="true"
      @select="handleSelect">
      <template v-for="item in list">
        <router-link :to="item.url" :key="item.url" v-if="item.children.length===0">
          <el-menu-item :index="item.url">
            <i :class="item.icon"></i>
            <span slot="title">{{item.name}}</span>
          </el-menu-item>
        </router-link>
        <subMenu v-else :data="item" :key="item.url"></subMenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import subMenu from "./SubMenu.vue";
export default {
  name: "menuList",
  components: {
    subMenu
  },
  props: {
    value: {
      type: [String, Boolean],
      default: ""
    }
  },
  data() {
    return {
      list: [], //当行菜单数据源
      activePath: "",
      myValue: this.value
    };
  },
  methods: {
    ...mapMutations(["getCollapse"]),
    toggleShowMeun() {
      let isCollapse = !this.isCollapse;
      this.getCollapse(isCollapse);
    },
    handleSelect(path, keyPath) {
      if (this.myValue) this.myValue = false;
      this.$router.push(path);
      this.activePath = path;
    }
  },
  created() {
    this.list = this.$store.state.menuList;
    let activePath = this.$route.meta.modulePath || this.$route.path;
    this.activePath = activePath;
  },
  watch: {
    $route(to, from) {
      let path = this.$route.meta.modulePath;
      this.activePath = path ? path : to.path; //让侧边菜单高亮
    },
    value(newValue) {
      this.myValue = newValue;
    },
    myValue(newValue) {
      this.$emit("input", newValue);
    }
  },
  computed: {
    ...mapState(["isCollapse", "menuList"])
  }
};
</script>

<style lang="scss">
.el-menu {
  border-right: 0;
}
</style>