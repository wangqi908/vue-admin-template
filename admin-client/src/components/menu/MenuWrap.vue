<template>
  <div class="menu-wrap">
    <Menu v-if="clientWidth>middle" />

    <el-drawer
      :visible.sync="show"
      :with-header="false"
      direction="ltr"
      class="menu-drawer"
      size="220px"
      v-else
    >
      <Menu />
    </el-drawer>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { throttle } from '@/utils'
import Menu from './Menu'
export default {
  components: { Menu },
  data() {
    return {
      show: false
    }
  },
  methods: {
    ...mapMutations('menuStore', [
      'setCollapse',
      'setClientWidth',
      'setDrawer'
    ]),

    setMeueCollapse(clientWidth) {
      let { big, middle } = this
      this.setCollapse(clientWidth < big && clientWidth > middle)
      this.setClientWidth(clientWidth)
    },

    getClientWidth() {
      window.addEventListener(
        'resize',
        throttle(() => {
          this.setMeueCollapse(document.body.clientWidth)
        }, 100)
      )
    }
  },
  created() {
    this.setMeueCollapse(document.body.clientWidth)
  },

  mounted() {
    this.getClientWidth()
  },
  watch: {
    show(val) {
      this.setDrawer(val)
    },
    isShowDrawer(val) {
      this.show = val
    }
  },
  computed: {
    ...mapState('menuStore', [
      'isCollapse',
      'clientWidth',
      'big',
      'middle',
      'isShowDrawer'
    ])
  }
}
</script>

<style lang='scss' >
.menu-wrap {
  height: 100%;
  .menu-drawer {
    .el-drawer {
      background-color: #273952;
      padding-top: 20px;
      overflow: auto;
    }
  }
}
</style>