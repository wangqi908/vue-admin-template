<template>
  <div class="menu-wrap">
    <Menu v-if="isBigClient" />

    <el-drawer
      :visible.sync="show"
      :with-header="false"
      direction="ltr"
      class="menu-drawer"
      size="210px"
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
      'setDrawer',
      'setSmClient'
    ]),

    setMeueCollapse(clientWidth) {
      let { big, small } = this
      this.setCollapse(clientWidth < big && clientWidth > small)
      this.setClientWidth(clientWidth)
      this.setSmClient(clientWidth > small)
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
    this.setSmClient(this.clientWidth > this.small)
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
      'small',
      'isShowDrawer',
      'isBigClient'
    ])
  }
}
</script>

<style lang='scss' >
.menu-wrap {
  height: 100%;
  .menu-drawer {
    .el-drawer {
      background-color: $menuBgc;
      padding-top: 20px;
      overflow: auto;
    }
  }
}
</style>