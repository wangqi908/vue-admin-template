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
  }
};
</script>
