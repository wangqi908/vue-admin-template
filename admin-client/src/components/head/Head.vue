<template>
  <div class="global-head">
    <div class="logo">
      <CollapseMenuBtn v-if="clientWidth>middle" />
      <DrawerMenuBtn v-else />
      <p>
        <router-link to="/index">后台管理系统</router-link>
      </p>
    </div>
    <ul class="btnBox">
      <li class="liItem add-transition">
        <MyScreenfull />
      </li>
      <li class="liItem add-transition">
        <el-dropdown>
          <span class="el-dropdown-link touxiang">
            <img :src="avatar" alt />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="checkUserInfo">{{userInfo.username}}</el-dropdown-item>

            <el-dropdown-item icon="el-icon-switch-button" @click.native="signOut">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import MyScreenfull from './MyScreenfull'
import CollapseMenuBtn from './CollapseMenuBtn'
import DrawerMenuBtn from './DrawerMenuBtn'
export default {
  components: { MyScreenfull, CollapseMenuBtn, DrawerMenuBtn },
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
    ...mapState(['userInfo']),
    ...mapState('menuStore', ['clientWidth', 'middle']),
    avatar() {
      let userInfo = this.userInfo
      let avatar = ''
      if (userInfo.avatar) {
        avatar = userInfo.http + userInfo.avatar
      } else {
        avatar = require('@/assets/imgs/touxiang.jpg')
      }
      return avatar
    }
  },
  created() {}
}
</script>

<style lang="scss">
.global-head {
  height: 50px;
  background-color: #496081;
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
        background-color: #38556a;
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
}
</style>
