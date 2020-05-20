<template>
  <div class="tinymce-editor">
    <editor v-model="myValue" :init="init" :disabled="disabled"></editor>
  </div>
</template>
<script>
// import tinymce from "tinymce/tinymce";
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/themes/silver'
// 编辑器插件plugins
import 'tinymce/plugins/image' // 插入上传图片插件
import 'tinymce/plugins/media' // 插入视频插件
import 'tinymce/plugins/table' // 插入表格插件
import 'tinymce/plugins/lists' // 列表插件
import 'tinymce/plugins/wordcount' // 字数统计插件
import 'tinymce/plugins/advlist'
import 'tinymce/plugins/anchor'
import 'tinymce/plugins/autolink'
import 'tinymce/plugins/autosave'
import 'tinymce/plugins/code'
import 'tinymce/plugins/codesample'
import 'tinymce/plugins/directionality'
import 'tinymce/plugins/fullscreen'
import 'tinymce/plugins/hr'
import 'tinymce/plugins/image'
import 'tinymce/plugins/imagetools'
import 'tinymce/plugins/insertdatetime'
import 'tinymce/plugins/media'
import 'tinymce/plugins/nonbreaking'
import 'tinymce/plugins/noneditable'
import 'tinymce/plugins/pagebreak'
import 'tinymce/plugins/paste'
import 'tinymce/plugins/preview'
import 'tinymce/plugins/print'
import 'tinymce/plugins/save'
import 'tinymce/plugins/searchreplace'
import 'tinymce/plugins/spellchecker'
import 'tinymce/plugins/tabfocus'
import 'tinymce/plugins/table'
import 'tinymce/plugins/template'
import 'tinymce/plugins/textpattern'
import 'tinymce/plugins/visualblocks'
import 'tinymce/plugins/visualchars'
import 'tinymce/plugins/wordcount'
export default {
  components: {
    Editor
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    plugins: {
      type: [String, Array],
      default: () => [
        'advlist anchor autolink autosave code codesample directionality fullscreen hr image imagetools insertdatetime  lists media nonbreaking noneditable pagebreak paste preview print save searchreplace spellchecker tabfocus table template textpattern visualblocks visualchars wordcount'
      ]
    },
    toolbar: {
      type: [String, Array],
      default: () => [
        'searchreplace bold italic underline strikethrough alignleft aligncenter alignright outdent indent  blockquote undo redo removeformat subscript superscript code codesample',
        'hr bullist numlist link image charmap preview anchor pagebreak insertdatetime media table emoticons forecolor backcolor fullscreen'
      ]
    }
  },
  data() {
    return {
      init: {
        language_url: './tinymce/langs/zh_CN.js',
        language: 'zh_CN',
        skin_url: './tinymce/skins/ui/oxide',
        content_css: './tinymce/skins/content/default/content.css',
        height: 600,
        plugins: this.plugins, // 父组件传入
        toolbar: this.toolbar, // 工具栏
        browser_spellcheck: true, // 拼写检查
        branding: false, // 去水印
        elementpath: false, //禁用编辑器底部的状态栏
        paste_data_images: true // 允许粘贴图像
      },
      myValue: this.value
    }
  },
  mounted() {
    // eslint-disable-next-line no-undef
    tinymce.init({})
  },
  watch: {
    value(newValue) {
      this.myValue = newValue
    },
    myValue(newValue) {
      this.$emit('input', newValue)
    }
  }
}
</script>
