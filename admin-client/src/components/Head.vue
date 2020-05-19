<template>
  <div class="globalHead">
    <div class="logo">
      <img src="@/assets/imgs/logo.png" />
      <p>
        <router-link to="/index">售后管理系统</router-link>
      </p>
    </div>
    <ul class="btnBox">
      <li class="liItem">
        <el-dropdown>
          <span class="el-dropdown-link touxiang">
            <img src="@/assets/imgs/touxiang.jpg" alt />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="checkUserInfo">{{userInfo.name}}</el-dropdown-item>

            <el-dropdown-item icon="el-icon-switch-button" @click.native="signOut">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  data() {
    return {}
  },
  methods: {
    ...mapMutations(['setUserInfo', 'setToken']),
    signOut() {
      this.setUserInfo()
      this.setToken()

      this.$router.push('/login')
      this.$message({
        message: '退出成功',
        type: 'success'
      })
    },
    checkUserInfo() {
      this.$router.push('/account')
    },
    checkMessage() {
      this.$router.push('/msg')
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  created() {}
}
</script>

<style lang="scss">
.globalHead {
  height: 50px;
  background-color: #7d7de8;
  display: flex;
  align-items: center;
  /* padding: 0 20px; */
  justify-content: space-between;
  .logo {
    display: flex;
    align-items: center;
    a {
      text-decoration: none;
      color: #fff;
      font-weight: 600;
    }
    p {
      font-size: 20px;
      margin-left: 40px;
    }
    img {
      height: 40px;
      margin-left: 20px;
    }
  }
  .btnBox {
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 50px;
    margin-right: 20px;
    .liItem {
      width: 44px;
      text-align: center;
      height: 50px;
      line-height: 50px;
      .iconfont {
        color: #fff;
      }
      &:hover {
        background-color: #adacec;
        cursor: pointer;
      }
      .touxiang {
        padding-top: 9px;
        box-sizing: border-box;
        img {
          width: 25px;
          height: 25px;
          border-radius: 50%;
        }
      }
    }
    .el-dropdown-link {
      display: block;
      width: 44px;
      text-align: center;
      height: 50px;
    }
  }
  .el-icon-bell,
  .el-icon-user {
    font-size: 20px;
    color: #fff;
    vertical-align: middle;
  }
  .dot {
    .el-badge__content {
      border: 0;
      &.is-fixed {
        top: 20px;
        &.is-dot {
          right: 8px;
        }
      }
    }
  }

  .menu {
    line-height: normal;
    position: absolute;
    top: 50px;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    overflow: hidden;
    box-shadow: 0px 4px 12px 0px rgb(148, 148, 148);
    background-color: rgb(255, 255, 255);
    width: 90%;
    color: rgb(110, 110, 110);
    .item {
      border-bottom: 1px solid rgb(219, 219, 219);
      &:hover {
        background-color: rgb(241, 241, 241);
      }
    }
    .list {
      display: flex;
      justify-content: space-between;
    }
    .title {
      margin: 10px;
    }
    .subMenu {
      background-color: rgb(251, 251, 251);
      text-align: left;
      .subItem {
        padding: 10px 10px 10px 20px;
        &:hover {
          background-color: rgb(241, 241, 241);
        }
      }
    }
  }
  .active {
    background-color: rgb(241, 241, 241);
  }
}
.el-message {
  min-width: 220px;
}
.el-popover {
  padding: 0;
  .el-tabs--top .el-tabs__item.is-top:last-child {
    padding-right: 35px;
  }
  .el-tabs__item {
    padding: 0 70px;
  }
  .el-tabs--top .el-tabs__item.is-top:nth-child(2) {
    padding-left: 35px;
    margin-left: 0;
  }
  .el-tabs__active-bar {
    margin-left: 0;
  }
  .el-tab-pane {
    height: 300px;
    overflow: auto;
  }
  .section {
    display: flex;
    justify-content: space-between;
    padding: 10px 20px 10px 30px;
    &:hover {
      background: #f2f2f2;
      cursor: pointer;
    }
    .sectionTitle {
      display: flex;
      position: relative;
      align-items: center;
      .commonBtn {
        padding: 2px 10px;
        border-radius: 20px;
        margin-left: 20px;
        font-size: 12px;
      }
      .sectionIcon {
        position: absolute;
        left: -20px;
      }
    }
    .orderInfo {
      display: flex;
      .orderNum {
        margin-left: 20px;
      }
    }
    .sectionRight {
      font-size: 12px;
    }
  }
  .el-checkbox {
    display: block;
    position: relative;
    padding: 10px 20px 10px 10px;
    border-top: 1px solid #ccc;
    .el-checkbox__input {
      position: absolute;
      right: 20px;
    }
    .el-checkbox__inner {
      height: 20px;
      width: 20px;
      border-radius: 50%;
      border-width: 3px;
    }
    .el-checkbox__inner::after {
      left: 5px;
      top: 2px;
    }
  }
}
</style>
