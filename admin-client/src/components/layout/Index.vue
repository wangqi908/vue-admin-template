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
    components: { AppMain,MyNavMenu, MyHeader }
};
</script>

<style>
</style>