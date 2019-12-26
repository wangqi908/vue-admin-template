<template>
  <div class='menu-trigger'>
    <i :class="['el-icon-menu','flex-center','meun-icon',isCollapse?'isActive':'']" @click="toggleShowMeun"></i>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  methods: {
    ...mapMutations(["getCollapse"]),
    toggleShowMeun() {
      let isCollapse = !this.isCollapse;
      this.getCollapse(isCollapse);
    }
  },
  computed: {
    ...mapState(["isCollapse"])
  }
};
</script>

<style lang="scss">
.menu-trigger {
  .el-icon-menu {
    font-size: 40px;
    transform: rotate(0deg);
    transition: all 0.28s;
    &:hover {
      cursor: pointer;
    }
  }
  .isActive {
    font-size: 18px;
    transform: rotate(180deg);
  }
}
</style>
