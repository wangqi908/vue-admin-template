<template>
  <div class=''>
    <el-button type="text" size="small" @click="handleInfo(null,'add')">添加角色</el-button>
    <!-- 操作信息对话框 -->
    <my-info-dialog v-if="visible" :visible.sync="visible" :_id="activeId" :type="type" @before-close="handleClose" />
  </div>
</template>

<script>
import { permissionTreeReq } from "@apis";
import { MyInfoDialog, MyRemoveDialog } from "./components";
export default {
  components: { MyInfoDialog, MyRemoveDialog },
  data() {
    return {
      ids: [], //多选id
      visible: false, //操作信息对话框
      visible_remove: false, //删除对话框
      activeId: "", //当前id
      type: "" //当前弹框类型
    };
  },
  methods: {
    // 处理增删改查
    handleInfo(item, type) {
      this.visible = true;
      this.activeId = item ? item._id : "";
      this.type = type;
    },

    // 操作成功
    handleClose() {
      // this.getTableData();
    }
  },
  created() {},
  mounted() {},
  computed: {},
  watch: {}
};
</script>

<style lang='scss'>
</style>
