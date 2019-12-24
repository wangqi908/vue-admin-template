<template>
  <li class="item" @click="screenfull">
    <i class="el-icon-rank"></i>
  </li>
</template>

<script>
import screenfull from "screenfull";
export default {
  methods: {
    // 全屏
    screenfull() {
      if (!screenfull.isEnabled) {
        this.$message({
          message: "不支持全屏",
          type: "warning"
        });
        return false;
      }
      screenfull.toggle();
    }
  }
};
</script>
