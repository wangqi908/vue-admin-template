<template>
  <li class="item">
    <el-dropdown>
      <span class="el-dropdown-link ">
        <i class="el-icon-user"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>{{userInfo.username}}</el-dropdown-item>
        <el-dropdown-item divided @click.native="signOut">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </li>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { resetRouter } from "@/router";
export default {
  methods: {
    ...mapMutations(["removeUserInfo", "removeToken"]),
    // 退出
    signOut() {
      this.removeUserInfo();
      this.removeToken();
      this.$router.replace("/login");
      resetRouter(); // 为了重新实例化vue-router对象 避免bug
      this.$message({
        message: "退出成功",
        type: "success"
      });
    }
  },
  computed: {
    ...mapState(["userInfo"])
  },
  watch: {}
};
</script>
