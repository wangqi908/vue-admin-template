<template>
  <div class="languages">
    <div>
      <el-radio v-model="locale" label="zh" border>中文</el-radio>
      <el-radio v-model="locale" label="en" border>英文</el-radio>
    </div>

    <el-date-picker v-model="value" type="date" :placeholder="$t('common.date-tip')"></el-date-picker>

    <el-button>{{$t('common.confirm')}}</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      locale: 'zh',
      value: ''
    }
  },
  watch: {
    locale(val) {
      this.$i18n.locale = val
    }
  }
}
</script>
