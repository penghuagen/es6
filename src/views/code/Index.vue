<template>
<div class="code-mirror-container" :class="{'cobalt': theme === 'cobalt'}" >
  <div class="code-mirror-header" :class="{'horizontal': horizontal}">
    <div class="icon-code stack" @click="horizontal = !horizontal"></div>
    <div class="icon-code theme"  @click="changeTheme" ></div>
    <div class="icon-code try" @click="submitTryit"></div>
  </div>
  <div class="code-mirror-main">
    <div class="code-mirror-layout" :class="{'horizontal': horizontal}">
      <div class="code-mirror-wrap">
        <es6-code-mirror :theme="theme" :code="code" ref="codeMirror"></es6-code-mirror>
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
  name: 'CodeIndex',
  data () {
    return {
      code: '', // 调试的代码
      horizontal: false, // 是否是横向
      theme: 'default' // 调试主题
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
      var text = this.$refs.codeMirror.value
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
      background-position: -65px -375px;
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
        flex: 1;
      }

      .code-mirror-result{
        background-color: #fff;
        flex: 1;
        #iframewrapper{
          height: 100%;
          /deep/ #iframeResult{
            height: 100%;
          }
        }
      }
    }

    .horizontal{
      flex-direction: column;
    }
  }
}

.cobalt{
  background-color: #353940;
  color: #ddd;
  .code-mirror-header{
    background-color:#353940;
    .theme{
      background-position: -130px -150px;
    }

    .theme:hover{
      background-position: -130px -225px;
    }
  }
}
</style>
