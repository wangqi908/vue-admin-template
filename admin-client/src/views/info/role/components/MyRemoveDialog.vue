<template>
  <el-dialog :title="title" :visible.sync="myVisible">
    <span>确认删除</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="myVisible = false">取 消</el-button>
      <el-button type="primary" @click="comfrim">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { userRemoveReq } from "@apis";
export default {
  props: ["visible", "ids"],
  data() {
    return {
      myVisible: this.visible,
      disabled: true,
      title: "确认删除"
    };
  },
  methods: {
    async comfrim() {
      const res = await userRemoveReq({ ids: this.ids });
      if (res.data.code === 200) {
        let resData = res.data.data;
        this.$message.success("删除成功");
        this.$emit("before-close");
        this.myVisible = false;
      }
    }
  },
  watch: {
    visible(v) {
      this.myVisible = v;
    },
    myVisible(v) {
      this.$emit("update:visible", v);
    }
  }
};
</script>
