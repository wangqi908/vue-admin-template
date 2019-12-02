<template>
  <el-dialog title="收货地址" :visible.sync="myVisible">
    <el-form :model="form">
      <el-form-item label="活动名称" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="活动区域" :label-width="formLabelWidth">
        <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="myVisible = false">取 消</el-button>
      <el-button type="primary" @click="myVisible = false">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {} from "@apis";
export default {
  props: ["visible"],
  data() {
    return {
      myVisible: this.visible,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      formLabelWidth: "120px"
    };
  },
  methods: {
    async login() {
      const res = await loginReq(sendData);
      if (res.data.code === 200) {
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

<style lang='scss'>
</style>
