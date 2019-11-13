<template>
  <div class="my-header">
    <h1>
      <router-link to="/index">LOGO</router-link>
    </h1>
    <ul class="btn-box">
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
    </ul>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {};
  },
  methods: {
    ...mapMutations(["removeUserInfo", "removeToken"]),

    // 退出
    signOut() {
      this.removeUserInfo();
      this.removeToken();
      this.$router.replace("/login");
      this.$message({
        message: "退出成功",
        type: "success"
      });
    }
  },
  computed: {
    ...mapState(["userInfo"])
  }
};
</script>

<style lang="scss">
.my-header {
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  border-radius: 4px;
  padding: 10px;
  margin: 10px 10px 0 10px;
  h1 {
    a {
      color: #ccc;
    }
  }
  .btn-box {
    display: flex;
    align-items: center;
    justify-content: space-around;
    .item {
      padding: 10px;
      &:hover {
        cursor: pointer;
      }
    }
    .el-dropdown-link {
      display: block;
      text-align: center;
    }
  }
  .el-icon-bell,
  .el-icon-user {
    font-size: 20px;
    color: #ccc;
    vertical-align: middle;
  }
}
</style>
