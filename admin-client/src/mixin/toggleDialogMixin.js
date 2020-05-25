import { mapState } from 'vuex'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
      isFullscreen: false
    }
  },
  data() {
    return {
      myShow: this.visible
    }
  },
  methods: {
    showDialog() {
      this.myShow = true
    },
    isMobile() {
      let flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      )
      return !!flag
    }
  },
  created() {
    this.isFullscreen = !this.isBigClient && this.isMobile()
  },
  computed: {
    ...mapState('menuStore', ['isBigClient'])
  },

  watch: {
    visible(val) {
      this.myShow = val
    },
    myShow(val) {
      this.$emit('update:visible', val)
    },
    isBigClient(val) {
      this.isFullscreen = !val && this.isMobile()
    }
  }
}
