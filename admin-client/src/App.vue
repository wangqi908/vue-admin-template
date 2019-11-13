<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  created() {
    // vuex持久化
    if (localStorage.getItem("store")) {
      //页面加载前读取localStorage里的状态信息
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(localStorage.getItem("store"))
        )
      );
    }
    window.addEventListener("beforeunload", () => {
      //在页面刷新前将vuex里的信息保存到localStorage里
      localStorage.setItem("store", JSON.stringify(this.$store.state));
    });
  }
};
</script>