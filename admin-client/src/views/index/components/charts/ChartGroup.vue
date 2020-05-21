<template>
  <div>
    <el-row class="card-group">
      <el-col :xs="24" :sm="24" :lg="24">
        <div class="card-item">
          <AnimationBar />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="card-item">
          <Area />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="card-item">
          <Pie />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="card-item">
          <Scatter />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Area from './Area.vue'
import Pie from './Pie.vue'
import AnimationBar from './AnimationBar.vue'
import Scatter from './Scatter.vue'
export default {
  components: { Area, Pie, AnimationBar, Scatter }
}
</script>

<style lang="scss" scoped>
.card-group {
  .card-item {
    height: 340px;
    font-size: 12px;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 20px rgba(0, 0, 0, 0.1);
    margin: 10px;
    padding: 20px;
  }
}
</style>
