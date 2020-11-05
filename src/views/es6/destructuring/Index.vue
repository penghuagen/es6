<template>
<div class="code-mirror-container">
  <div class="code-mirror-header" :class="{'horizontal': horizontal}">
    <div class="icon-code stack" @click="horizontal = !horizontal"></div>
    <div class="icon-code theme"></div>
    <div class="icon-code try"></div>
  </div>
  <div class="code-mirror-main">
    <es6-code-mirror></es6-code-mirror>
  </div>
</div>
</template>

<script>
import Es6CodeMirror from '@/components/Es6CodeMirror'
export default {
  name: 'DestructuringIndex',
  data () {
    return {
      horizontal: false
    }
  },
  components: {
    Es6CodeMirror
  }
}
</script>

<style scoped lang="less">
.code-mirror-container{
  background-color: #f7f7f7;
  .code-mirror-header{
    display: flex;
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
}
</style>
