<template>
  <i :class="['el-icon-s-unfold',isCollapse?'add-rotate':'']" @click="setMeueCollapseByBtn"></i>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data() {
    return {
      switchValue: ''
    }
  },
  methods: {
    ...mapMutations('menuStore', ['setCollapse']),

    setMeueCollapseByBtn() {
      this.setCollapse(!this.isCollapse)
    }
  },

  watch: {
    switchValue(val) {
      this.setCollapse(!val)
    },
    isCollapse(val) {
      this.switchValue = !val
    }
  },
  computed: {
    ...mapState('menuStore', ['isCollapse'])
  }
}
</script>

<style lang='scss' scoped>
.el-icon-s-unfold {
  color: rgb(238, 236, 236);
  padding: 4px;
  margin-left: 20px;
  transition: all 0.5s;
  &:hover {
    cursor: pointer;
    background-color: #38556a;
    color: rgb(141, 141, 141);
  }
  &:active {
    background-color: rgb(122, 122, 122);
    color: #fff;
  }
}
.add-rotate {
  transform: rotate(180deg);
  transition: all 0.5s;
}
</style>