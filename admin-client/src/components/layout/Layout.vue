<template>
  <div class="layout">
    <div class="head">
      <Head />
    </div>

    <div class="container">
      <div class="aside">
        <MenuWrap />
      </div>
      <div class="main">
        <MyBreadcrumb />
        <MyRouterHistory />
        <div class="content">
          <transition name="fade" mode="out-in">
            <router-view />
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { Head, MenuWrap, MyBreadcrumb, MyRouterHistory } from '@/components'
export default {
  components: {
    Head,
    MenuWrap,
    MyBreadcrumb,
    MyRouterHistory
  },
  data() {
    return {
      isCollapse: false
    }
  },
  methods: {
    ...mapMutations(['setUserInfo', 'setToken', 'setHistoryList']),
    logout() {
      this.setToken()
      this.setUserInfo()
      this.setHistoryList()
      this.$router.push('/login')
    }
  },
  created() {}
}
</script>

<style lang='scss'>
html,
body {
  width: 100%;
  height: 100%;
}
.layout {
  width: 100%;
  height: 100%;
}
.layout {
  display: flex;
  flex-direction: column;
}

.container {
  display: flex;
  flex: 1;
  overflow: auto;
  background-color: rgb(243, 243, 243);
}
.aside {
  overflow: auto;
  background-color: #273952;
  padding-top: 10px;
}
.main {
  overflow: auto;
  flex: 1;
  background-color: #f8f8f8;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  .content {
    margin: 10px;
    flex: 1;
  }
}
</style>
