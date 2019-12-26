<template>
  <div class=''>
    <p>二级菜单1-1</p>
    <!-- <router-link to="/nested/menu1/menu1-1/info">
      <el-button>查看详情</el-button>
    </router-link> -->
    <el-button @click="check" >查看详情</el-button>
 
  </div>
</template>

<script>
export default {

  methods: {
    check(){
      // this.$router.push({ name: 'menu1-1-info', params: { id: '123' }})
      this.$router.push({ name: 'menu1-1-info'})
    },
  },
};
</script>
