<template>

  <div class='app-content'>
    <my-header />
    <div class="app-body">
      <my-nav-menu />
      <div class="body-content">
        <div class="body-content-router">
          <transition name="fade-transform" mode="out-in">
            <app-main />
          </transition>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import AppMain from "./AppMain.vue";
import { MyNavMenu, MyHeader } from "@c";
export default {
  components: { AppMain, MyNavMenu, MyHeader }
};
</script>

<style lang='scss'>
.app-content {
  display: flex;
  flex-direction: column;
  background-color: rgba(224, 224, 224, 0.438);
  height: 100%;
  widows: 100%;
  .app-body {
    display: flex;
    flex: 1;
  }
  .body-content {
    flex: 1;
    overflow: auto;
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow-x: hidden;
  }
  .body-content-router {
    margin: 10px;
    flex: 1;
  }
}
</style>
