<template>
  <div class="login">
    <my-form />
  </div>
</template>

<script>
import { MyForm } from './components'
export default {
  components: { MyForm }
}
</script>

<style lang='scss'>
.login {
  width: 100%;
  height: 100%;
  background-color: #4c6983;
}
</style>
