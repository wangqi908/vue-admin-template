<template>
  <div class='app-content'>
    <my-nav-menu />
    <div class="main-content">
      <div class="main-content-router">
        <transition name="fade-transform" mode="out-in">
          <router-view />
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { MyNavMenu } from "@c";
export default {
  components: { MyNavMenu },
  data() {
    return {};
  },
  methods: {},
  created() {},
  mounted() {},
  computed: {},
  watch: {}
};
</script>

<style lang='scss'>
.app-content {
  display: flex;
  background-color: rgba(224, 224, 224, 0.438);
  height: 100%;
  widows: 100%;
  .main-content {
    flex: 1;
    overflow: auto;
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow-x: hidden;
  }
  .main-content-router {
    margin: 10px;
    flex: 1;
  }
}
</style>
