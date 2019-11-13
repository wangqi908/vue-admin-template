<template>
  <div class='user'>
    <p>user</p>
    <p>user</p>
    <p>user</p>
    <p>uuseruseruseruseruseruseruseruseruseruseruseruseruseruseruseruseruseruseruseruseruseruseruseruseruseruseruseruseruseruseruseruseruseruseruseruseruseruseruseruseruseruseruseruseruseruseruserser</p>
    <div class="bigBox">
      <div class="box"></div>
      <div class="box"></div>
      <div class="box"></div>
      <div class="box"></div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  methods: {},
  created() {},
  mounted() {},
  computed: {},
  watch: {}
};
</script>

<style lang='scss'>
.user{
  p{
    border: 1px solid #000;
    padding: 30px;
  }
  .bigBox{
    border: 1px solid rgb(211, 60, 60);
    display: flex;
    flex-wrap: wrap;
    .box{
      width: 100px;
      height: 100px;
      margin: 10px;
      background-color: rgb(123, 198, 248);
    }
  }
}
</style>
