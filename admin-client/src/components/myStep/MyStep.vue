<template>
  <div class='steps'>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    size: [Number, String],
    active: {
      type: Number,
      default: 0
    },
    backgroundColor: String
  }
};
</script>

<style lang='scss'>
.steps {
  display: flex;
  justify-content: center;
}
</style>
