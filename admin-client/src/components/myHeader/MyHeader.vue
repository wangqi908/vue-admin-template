<template>
  <div class="my-header">
    <div class="header-left flex-center">
      <my-menu-trigger />
      <h1 class="flex-center">
        <router-link to="/index">LOGO</router-link>
      </h1>
    </div>
    <ul class="btn-box">
      <my-screenfull />
      <my-sign-out />
    </ul>
  </div>
</template>

<script>
import { MyScreenfull, MySignOut, MyMenuTrigger } from "./index.js";
export default {
  components: { MyScreenfull, MySignOut, MyMenuTrigger }
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
