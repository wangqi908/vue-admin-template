<template>
  <div class="step">
    <section class="section">
      <div :class="['line',isCircleAcitve?'active_circle_box':'']"></div>
      <div :class="['circle_box',isCircleAcitve?'active_circle_box':'']" :style="circleBoxStyle">
        <slot name="title"></slot>
      </div>
      <div :class="['line',isLineAcitve?'active_circle_box':'']"></div>
    </section>
    <div class="content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: "",
      children: [],
      len: ""
    };
  },
  mounted() {
    let children = this.$parent.$children;
    children.forEach((ele, index) => {
      ele.index = index;
    });
    let len = this.$parent.$children.length;
    this.len = len;
    this.children = children;
  },
  computed: {
    activeWatcher() {
      let active = this.$parent.active;
      this.active = active;

      return active;
    },
    isCircleAcitve(v) {
      let { active, $children } = this.$parent;
      let { len, children } = this;
      if (typeof active != "number") return false;
      return active >= v.index;
    },
    isLineAcitve(v) {
      let { active, $children } = this.$parent;
      let { len, children } = this;
      if (typeof active != "number") return false;
      return active - 1 >= v.index;
    },
    circleBoxStyle() {
      let { size, backgroundColor } = this.$parent;
      let style = {
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor
      };
      return style;
    }
  },
  watch: {
    activeWatcher(val) {
      this.active = val;
    }
  }
};
</script>

<style lang='scss'>
.step {
  flex: 1;
  font-size: 14px;
  &:first-child {
    .line {
      &:first-child {
        visibility: hidden;
      }
    }
  }
  &:last-child {
    .line {
      &:last-child {
        visibility: hidden;
      }
    }
  }
  .section {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .circle_box {
    color: #fff;
    background-color: #969090;
    width: 50px;
    height: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .line {
    min-width: 40px;
    background-color: #f3f3f3;
    width: 50%;
    height: 4px;
  }
  .active_circle_box {
    background-color: #67c23a;
  }
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}
</style>
