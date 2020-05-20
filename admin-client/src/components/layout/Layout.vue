<template>
  <div class="layout">
    <div class="head">
      <Head />
    </div>

    <div class="container">
      <div class="aside">
        <Menu />
      </div>
      <div class="main">
        <MyBreadcrumb />
        <MyRouterHistory />
        <transition name="fade" mode="out-in">
          <router-view />
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { Head, Menu, MyBreadcrumb, MyRouterHistory } from '@/components'
export default {
  components: {
    Head,
    Menu,
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

<style>
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
}
.aside {
  overflow: auto;
  background-color: #2d2c41;
  padding-top: 10px;
}
.main {
  overflow: auto;
  flex: 1;
  background-color: #f8f8f8;
}
</style>
