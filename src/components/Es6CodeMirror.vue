<template>
  <!-- Two-way Data-Binding -->
<!--  <codemirror v-model="code" :options="cmOptions" />-->

  <!-- Or manually control the data synchronization -->
  <codemirror
    ref="cmEditor"
    :value="value"
    :options="cmOptions"
    @ready="onCmReady"
    @focus="onCmFocus"
    @input="onCmCodeChange"
  />
</template>

<script>
// codemirror的api
// https://codemirror.net/doc/manual.html#api_sizing
// https://github.com/surmon-china/vue-codemirror
import 'codemirror/mode/javascript/javascript.js'

// import theme style
import 'codemirror/theme/base16-dark.css'
import 'codemirror/theme/cobalt.css'

export default {
  data () {
    return {
      value: '',
      cmOptions: {
        tabSize: 4,
        mode: 'text/javascript',
        // theme: 'base16-dark',
        theme: 'default',
        htmlMode: true,
        lineWrapping: true,
        smartIndent: false,
        addModeClass: true,
        lineNumbers: false,
        line: false
      }
    }
  },
  props: {
    theme: {
      type: String,
      default: 'default'
    },
    code: {
      type: String,
      default: ''
    }
  },
  watch: {
    theme: {
      handler (val, oldVal) {
        this.cmOptions.theme = val
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    onCmReady (cm) {
      console.log('the editor is readied!', cm)
    },
    onCmFocus (cm) {
      console.log('the editor is focused!', cm)
    },
    onCmCodeChange (newCode) {
      console.log('this is new code', newCode)
      this.value = newCode
    }
  },
  computed: {
    codemirror () {
      return this.$refs.cmEditor.codemirror
    }
  },
  mounted () {
    console.log('the current CodeMirror instance object:', this.codemirror)
    // you can use this.codemirror to do something...
  }
}
</script>
<style scoped lang="less">
  .vue-codemirror{
    height: 100%;
    /deep/  .CodeMirror {
      border: 1px solid #eee;
      height: 100%;
    }

    /deep/ .cm-s-cobalt.CodeMirror{
      background-color: #282c34;
      border: 1px solid #353940;
    }

    /deep/ .cm-s-cobalt .CodeMirror-gutters{
      background-color: #282c34;
    }

    /deep/ .CodeMirror-scroll {
      height: 100%;
      overflow-y: hidden;
      overflow-x: auto;
    }
  }

</style>
