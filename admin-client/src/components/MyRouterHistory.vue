<template>
  <div class='router-history'>
    <div :class="['item','flex-center','add-transition',acitveName===item.name?'active':'']" v-for="(item, index) in list" :key="index"
      @click="go(item)">
      <span>{{item.routerName}}</span>
      <div class="del add-transition flex-center" v-if="list.length>1" @click.stop="del(item,index)">x</div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      acitveName: "",
      list: []
    };
  },
  methods: {
    go(item) {
      this.$router.push({ name: item.name });
    },
    del(item, index) {
      let { list, acitveName } = this;
      if (list.length === 1) return;
      list.splice(index, 1);

      this.$store.commit("setHistoryList", list);
      if (item.name === acitveName) {
        let lastName = list[list.length - 1].name;
        this.$router.push({ name: lastName });
      }
    },
    initAcitveName() {
      this.acitveName = this.$router.history.current.name;
    }
  },
  created() {
    this.initAcitveName();
    this.list = this.$store.state.historyList;
  },
  computed: {
    historyList() {
      return this.$store.state.historyList;
    }
  },
  watch: {
    historyList(val) {
      this.list = val;
    },
    $route(to) {
      this.initAcitveName();
    }
  }
};
</script>

<style lang='scss'>
.router-history {
  display: flex;
  background-color: #fff;
  padding: 4px 10px;
  overflow: auto;
  font-size: 12px;
  .item {
    flex-shrink: 0;
    padding: 4px 6px;
    margin: 2px 6px;
    border-radius: 2px;
    border: 1px solid #ccc;
    user-select: none;
    &:hover {
      cursor: pointer;
    }
  }
  .active {
    background-color: #409eff;
    color: #fff;
  }
  .del {
    width: 14px;
    height: 14px;
    margin-left: 6px;
    border-radius: 50%;
    &:hover {
      background-color: rgb(214, 214, 214);
      color: #fff;
    }
  }
}
</style>
