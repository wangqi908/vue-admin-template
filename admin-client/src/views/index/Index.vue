<template>
  <div class='index'>
    <header>
      sdfsdf
    </header>
    <div class="box" v-fixed></div>
    <h1>
      水电费水电费水电费
    </h1>
  </div>
</template>

<script>
import fixed from "@/directive/scroll";
export default {
  directives: {
    fixed
  }
};
</script>

<style lang="scss">
.index {
  height: 2000px;
  header {
    padding: 80px;
    border: 1px solid #ccc;
  }
  .box {
    height: 60px;
    background-color: rgb(179, 218, 255);
  }
}
</style>
