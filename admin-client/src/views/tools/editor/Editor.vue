<template>
  <div class=''>
    <my-editor v-model="value" />
  </div>
</template>

<script>
import { MyEditor } from "@/components";
export default {
  components: { MyEditor },
  data() {
    return {
      value: ""
    };
  },
  methods: {},
  created() {},
  mounted() {},
  computed: {},
  watch: {}
};
</script>

<style lang='scss'>
</style>
