<template>
  <a-layout id="components-layout-demo-fixed-sider">
    <a-layout-sider v-model="collapsed" :trigger="null" collapsible class="layout-sider-left">
      <left-menu></left-menu>
    </a-layout-sider>
    <a-layout :style="{ marginLeft: collapsed ? '80px' : '200px' }">
      <a-layout-content :style="{ overflow: 'initial' }">
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
      collapsed: false
    }
  },
  components: {LeftMenu}
}
</script>

<style lang="less" scoped>
.layout-sider-left{
  overflow: auto;
  height: 100vh;
  position: fixed;
  left: 0;
  border-right: 12px solid #f0f2f5;
  .logo {
    height: 32px;
    margin: 16px;
    text-align:center;
    color:#fff;
    font-size: 20px;
    span{
      margin-left:8px;
    }
  }
}
.ant-layout-sider-collapsed{
  .logo{
    span{
      display: none;
    }
  }
}

.header-top{
  background: #fff; padding: 0;text-align: left;
  height: 32px;
  padding: 6px 0 0 15px;
}
</style>
