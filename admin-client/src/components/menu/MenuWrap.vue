<template>
  <div class="menu-wrap">
    <Menu />
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { throttle } from '@/utils'
import Menu from './Menu'
export default {
  components: { Menu },
  methods: {
    ...mapMutations('menuStore', ['setCollapse']),

    setMeueCollapse(clientWidth) {
      this.setCollapse(clientWidth < 1000)
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
  watch: {},
  computed: {
    ...mapState(['isCollapse'])
  }
}
</script>

<style scoped>
.menu-wrap {
  height: 100%;
}
</style>