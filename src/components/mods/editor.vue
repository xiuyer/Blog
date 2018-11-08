<template>
  <div>
    <script id="editor" type="text/plain"></script>
  </div>
</template>
<script>
export default {
  name: 'editor',
  data () {
    return {
      editor: null
    }
  },
  props: {
    defaultContent: {
      type: String
    },
    config: {
      type: Object
    }
  },
  mounted () {
    const _this = this
    this.editor = window.UE.getEditor('editor', this.config) // 初始化UE
    this.editor.addListener('ready', function () {
      _this.editor.setContent(_this.defaultContent) // 确保UE加载完成后，放入内容。
    })
  },
  methods: {
    getUEContent () { // 获取内容方法
      return this.editor.getContent()
    },
    getUEContentTxt () { // 获取纯文本方法
      return this.editor.getContentTxt()
    }
  },
  destroyed () {
    this.editor.destroy()
  }
}
</script>
