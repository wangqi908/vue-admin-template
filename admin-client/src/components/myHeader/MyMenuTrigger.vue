<template>
  <div class=''>
    <i :class="['el-icon-right','flex-center','meun-icon',isCollapse?'isActive':'']" @click="toggleShowMeun"></i>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  methods: {
    ...mapMutations(["getCollapse"]),
    toggleShowMeun() {
      let isCollapse = !this.isCollapse;
      this.getCollapse(isCollapse);
    }
  },
  computed: {
    ...mapState(["isCollapse"])
  }
};
</script>
