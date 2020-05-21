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

<style scoped>
.login {
  width: 100%;
  height: 100%;
  background-color: #454466;
}
</style>