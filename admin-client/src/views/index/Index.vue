<template>
  <div class="index">
    <CardGroup />
    <ChartGroup />
  </div>
</template>

<script>
import { CardGroup, ChartGroup } from './components'
export default {
  components: { CardGroup, ChartGroup }
}
</script>

<style lang="scss" >
.index {
  border: 1px solid #000;
}
</style>
