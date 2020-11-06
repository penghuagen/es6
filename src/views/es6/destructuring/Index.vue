<template>
<div class="code-mirror-container">
  <div class="code-mirror-header" :class="{'horizontal': horizontal}">
    <div class="icon-code stack" @click="horizontal = !horizontal"></div>
    <div class="icon-code theme" @click="changeTheme"></div>
    <div class="icon-code try" @click="submitTryit"></div>
  </div>
  <div class="code-mirror-main">
    <div class="code-mirror-layout" :class="{'horizontal': horizontal}">
      <div class="code-mirror-wrap">
        <es6-code-mirror :theme="theme" ref="codeMirror"></es6-code-mirror>
      </div>
      <div class="code-mirror-result">
        <div id="iframewrapper"></div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Es6CodeMirror from '@/components/Es6CodeMirror'
export default {
  name: 'DestructuringIndex',
  data () {
    return {
      horizontal: false,
      theme: 'default'
    }
  },
  components: {
    Es6CodeMirror
  },
  methods: {
    changeTheme () {
      this.theme = this.theme === 'default' ? 'cobalt' : 'default'
    },
    submitTryit () {
      var text = this.$refs.codeMirror.code
      var patternHtml = /<html[^>]*>((.|[\n\r])*)<\/html>/im
      var patternHead = /<head[^>]*>((.|[\n\r])*)<\/head>/im
      var arrayMatchesHead = patternHead.exec(text)
      var patternBody = /<body[^>]*>((.|[\n\r])*)<\/body>/im

      var arrayMatchesBody = patternBody.exec(text)
      var basepathFlag = 1
      var basepath = ''
      if (basepathFlag) {
        basepath = '<base href="//www.runoob.com/try/demo_source/" target="_blank">'
      }
      if (arrayMatchesHead) {
        text = text.replace('<head>', '<head>' + basepath)
      } else if (patternHtml) {
        text = text.replace('<html>', '<head>' + basepath + '</head>')
      } else if (arrayMatchesBody) {
        text = text.replace('<body>', '<body>' + basepath)
      } else {
        text = basepath + text
      }
      var ifr = document.createElement('iframe')
      ifr.setAttribute('frameborder', '0')
      ifr.setAttribute('id', 'iframeResult')
      document.getElementById('iframewrapper').innerHTML = ''
      document.getElementById('iframewrapper').appendChild(ifr)

      var ifrw = (ifr.contentWindow) ? ifr.contentWindow
        : (ifr.contentDocument.document) ? ifr.contentDocument.document : ifr.contentDocument
      ifrw.document.open()
      ifrw.document.write(text)
      ifrw.document.close()
    }
  }
}
</script>

<style scoped lang="less">
.code-mirror-container{
  display: flex;
  height:100%;
  width:100%;
  flex-wrap: nowrap;
  flex-direction: column;
  overflow:visible;
  background-color: #fff;
  padding:0 15px 15px 0;
  .code-mirror-header{
    display: flex;
    flex-shrink:0;
    background-color: #f7f7f7;
    .icon-code{
      flex-grow: 0;
      display: block;
      background-repeat: no-repeat;
      background-image:url("~@/assets/img/tiy-bg.png");
    }

    .stack{
      width: 65px;
      height: 55px;
      background-position: -65px 0;
    }

    .stack:hover{
      background-position: -65px -75px;
    }

    .theme{
      width: 65px;
      height: 55px;
      background-position: -130px 0;
    }

    .theme:hover{
      background-position: -130px -75px;
    }

    .try{
      width: 150px;
      height: 55px;
      background-position: -195px 0;
    }

    .try:hover{
      background-position: -195px -75px;
    }
  }

  .horizontal{
    .stack{
      background-position: -65px -300px;
    }

    .stack:hover{
      background-position: -65px -300px;
    }
  }

  .code-mirror-main{
    flex:auto;
    overflow:auto;
    flex-shrink:1;
    -webkit-overflow-scrolling:touch;

    .code-mirror-layout{
      display: flex;
      height: 100%;
      .code-mirror-wrap{
        width: 100%;
        flex: 1;
      }

      .code-mirror-result{
        width: 100%;
        flex: 1;
      }
    }

    .horizontal{
      flex-wrap: wrap;
    }
  }
}
</style>
