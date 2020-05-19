export default {
  props: {
    visible: {
      type: Boolean,
      default: false
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
    }
  },

  watch: {
    visible(val) {
      this.myShow = val
    },
    myShow(val) {
      this.$emit('update:visible', val)
    }
  }
}
