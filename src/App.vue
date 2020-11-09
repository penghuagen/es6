<template>
  <a-layout class="layout-sider">
    <a-layout-sider class="layout-sider-left">
      <left-menu></left-menu>
    </a-layout-sider>
    <a-layout class="layout-sider-right">
      <a-layout-content>
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive" v-wechat-title="$route.meta.title" replace></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive" v-wechat-title="$route.meta.title" replace></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import LeftMenu from '@/components/Menu'
export default {
  name: 'App',
  data () {
    return {
    }
  },
  components: {LeftMenu}
}
</script>

<style lang="less" scoped>
.layout-sider{
  display: flex;
  height: 100%;
  width: 100%;
}
.layout-sider-left{
  flex-grow: 0;
  flex-shrink: 0;
}
  .layout-sider-right{
    box-shadow:0 0 10px #ccc;
  }
</style>
