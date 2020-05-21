<template>
  <el-row class="card-group">
    <el-col :xs="12" :sm="12" :lg="6" v-for="item in card" :key="item.id">
      <div class="card-item" @click="setBarData">
        <div class="num-box">
          <p>{{item.type}}</p>
          <p>{{item.num}}</p>
        </div>
        <div class="icon-box">
          <i :class="item.icon" :style="{color:item.color}"></i>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      card: [
        {
          id: 0,
          num: 12,
          type: 'uesrs',
          icon: 'el-icon-takeaway-box',
          color: '#EBD9DD'
        },
        {
          id: 1,
          num: 52,
          type: 'list',
          icon: 'el-icon-brush',
          color: '#D8AED3'
        },
        {
          id: 3,
          num: 132,
          type: 'roles',
          icon: 'el-icon-attract',
          color: '#9182C4'
        },
        {
          id: 4,
          num: 152,
          type: 'pics',
          icon: 'el-icon-coordinate',
          color: '#FECEA8'
        }
      ]
    }
  },
  methods: {
    ...mapMutations('charts', ['setBarData'])
  }
}
</script>

<style lang="scss" scoped>
.card-group {
  .card-item {
    height: 100px;
    font-size: 12px;
    color: #666;
    background: #fff;
    margin: 10px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    padding: 20px;
    &:hover {
      transform: scale(1.02);
      box-shadow: 4px 4px 20px rgba(0, 0, 0, 0.1);
      transition: all 0.4s;
    }
  }
  .num-box {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    p {
      &:first-child {
        font-size: 16px;
        color: rgb(156, 189, 250);
        margin-bottom: 10px;
      }
      &:last-child {
        font-size: 20px;
        color: rgb(241, 112, 112);
      }
    }
  }
  .icon-box {
    display: flex;
    align-items: center;
    font-size: 46px;
  }
}

@media (max-width: 550px) {
  .card-group .card-item {
    justify-content: center;
  }
  .card-group .card-item .num-box {
    display: none;
  }
}
</style>
