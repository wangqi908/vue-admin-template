<template>
  <i :class="['el-icon-s-unfold',isShowDrawer?'add-rotate':'']" @click="setMeueCollapseByBtn"></i>
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
    ...mapMutations('menuStore', ['setDrawer']),

    setMeueCollapseByBtn() {
      this.setDrawer(!this.isShowDrawer)
    }
  },

  watch: {
    switchValue(val) {
      this.setDrawer(!val)
    },
    isShowDrawer(val) {
      this.switchValue = !val
    }
  },
  computed: {
    ...mapState('menuStore', ['isShowDrawer'])
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
    background-color: $menuHoverBgc;
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