<template>
  <div class="sticky">
    <p>Test</p>
    <p>Test</p>
    <p>Test</p>
    <p>Test</p>
    <my-sticky :top="120">
      <el-button>固定</el-button>
    </my-sticky>
    <p>Test</p>
    <p>Test</p>
    <p>Test</p>
    <p>Test</p>
    <p>Test</p>
    <p>Test</p>
    <p>Test</p>
    <p>Test</p>
    <p>Test</p>
    <p>Test</p>
    <p>Test</p>
    <p>Test</p>
    <p>Test</p>
    <p>Test</p>
    <p>Test</p>
    <p>Test</p>
  </div>
</template>

<script>
import { MySticky } from '@/components'
export default {
  components: { MySticky }
}
</script>

<style lang="scss">
.sticky {
  p {
    padding: 20px 20px 20px 0;
    border: 1px solid #ccc;
    margin: 10px 10px 10px 0;
    background-color: #fff;
  }
}
</style>
