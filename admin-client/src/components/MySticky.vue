<template>
  <div class='sticky-wrap' :style="wrapStyle()">
    <div :class='className' :style="stickyStyle()">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Sticky",
  props: {
    top: {
      type: Number,
      default: 0
    },
    zIndex: {
      type: Number,
      default: 1
    },
    className: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      isSticky: false,
      width: "",
      height: "",
      content: ""
    };
  },
  methods: {
    wrapStyle() {
      let { height } = this;
      let defaultStyle = {
        height: height + "px"
      };
      return defaultStyle;
    },
    stickyStyle() {
      let { isSticky, top, width, height, zIndex } = this;
      let defaultStyle = {
        zIndex,
        position: "",
        width: "auto",
        height: height + "px"
      };
      let activeStyle = {
        zIndex,
        position: "fixed",
        top: top + "px",
        width: width + "px",
        height: height + "px"
      };

      return isSticky ? activeStyle : defaultStyle;
    },
    handleScroll() {
      const width = this.$el.getBoundingClientRect().width;
      const offsetTop = this.$el.getBoundingClientRect().top;
      this.width = width || "auto";
      this.isSticky = offsetTop < this.top;
    }
  },
  mounted() {
    this.height = this.$el.getBoundingClientRect().height;
    this.content = document.querySelector(".body-content");
    this.content.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    this.content.removeEventListener("scroll", this.handleScroll);
  }
};
</script>
