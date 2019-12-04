<template>
  <div class="my-header">
    <div class="header-left flex-center">
      <i :class="['el-icon-right','flex-center','meun-icon',isCollapse?'isActive':'']" @click="toggleShowMeun"></i>
      <h1 class="flex-center">
        <router-link to="/index">LOGO</router-link>
      </h1>
    </div>
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
    ...mapMutations(["removeUserInfo", "removeToken", "getCollapse"]),

    toggleShowMeun() {
      let isCollapse = !this.isCollapse;
      this.getCollapse(isCollapse);
    },
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
    ...mapState(["isCollapse", "userInfo"])
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

  .el-icon-right {
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
  .el-submenu__icon-arrow {
    display: none;
  }

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
