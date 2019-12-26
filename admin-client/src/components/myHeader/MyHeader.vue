<template>
  <div class="my-header">
    <div class="header-left flex-center">
      <my-menu-trigger />
      <div class="breadcrumb">
        <my-breadcrumb />
      </div>
    </div>
    <ul class="btn-box">
      <my-screenfull />
      <my-sign-out />
    </ul>
  </div>
</template>

<script>
import { MyBreadcrumb } from "@/components";
import { MyScreenfull, MySignOut, MyMenuTrigger } from "./index.js";
export default {
  components: { MyScreenfull, MySignOut, MyMenuTrigger, MyBreadcrumb }
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
    .el-icon-user {
      font-size: 20px;
      color: #ccc;
      vertical-align: middle;
    }
  }

  .breadcrumb {
    margin-left: 10px;
  }
}
</style>
