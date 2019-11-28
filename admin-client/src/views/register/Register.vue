<template>
  <div class='login'>
    <MyUpload />
    <!-- <my-form /> -->
  </div>
</template>

<script>
import { MyForm } from "./components";
import { MyUpload } from "@/components";
export default {
  components: { MyForm, MyUpload }
};
</script>

<style lang='scss'>
.login {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
}
</style>
