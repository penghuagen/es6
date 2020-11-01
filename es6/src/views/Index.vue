<template>
  <a-layout id="components-layout-demo-fixed-sider">
    <a-layout-sider v-model="collapsed" :trigger="null" collapsible class="layout-sider-left">
      <div class="logo">
        <a-icon
        class="trigger"
        :type="collapsed ? 'menu-unfold' : 'menu-fold'"
        @click="() => (collapsed = !collapsed)"
      /><span>ES6用例</span></div>
      <a-menu theme="dark" mode="inline" :default-selected-keys="['4']">
        <a-menu-item key="1">
          <a-icon type="user" />
          <span class="nav-text">nav 1</span>
        </a-menu-item>
        <a-menu-item key="2">
          <a-icon type="video-camera" />
          <span class="nav-text">nav 2</span>
        </a-menu-item>
        <a-menu-item key="3">
          <a-icon type="upload" />
          <span class="nav-text">nav 3</span>
        </a-menu-item>
        <a-menu-item key="4">
          <a-icon type="bar-chart" />
          <span class="nav-text">nav 4</span>
        </a-menu-item>
        <a-menu-item key="5">
          <a-icon type="cloud-o" />
          <span class="nav-text">nav 5</span>
        </a-menu-item>
        <a-menu-item key="6">
          <a-icon type="appstore-o" />
          <span class="nav-text">nav 6</span>
        </a-menu-item>
        <a-menu-item key="7">
          <a-icon type="team" />
          <span class="nav-text">nav 7</span>
        </a-menu-item>
        <a-menu-item key="8">
          <a-icon type="shop" />
          <span class="nav-text">nav 8</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout :style="{ marginLeft: collapsed ? '80px' : '200px' }">
      <a-layout-content :style="{ overflow: 'initial' }">
        <div>

        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
export default {
  data () {
    return {
      collapsed: false
    }
  }
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
