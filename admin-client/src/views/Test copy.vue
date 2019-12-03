<template>
  <div class=''>
    <my-step :active="active" size="80">
      <my-steps>
        <p slot="title">检验员</p>
        <div slot="content" class="step_content">
          <p>提交申请</p>
        </div>
      </my-steps>
      <my-steps>
        <p slot="title">检验员</p>
        <div slot="content" class="step_content">
          <p>提交申请</p>
        </div>
      </my-steps>
      <my-steps>
        <p slot="title">检验员</p>
        <div slot="content" class="step_content">
          <p>提交申请</p>
        </div>
      </my-steps>
    </my-step>
  </div>
</template>

<script>
import { MyStep, MySteps } from "@/components";
export default {
  components: { MyStep, MySteps },
  data() {
    return {
      active: 1
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
