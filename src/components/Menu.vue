<template>
  <div class="left-menu">
    <div class="logo">
      <a-icon
        class="trigger"
        :type="collapsed ? 'menu-unfold' : 'menu-fold'"
        @click="() => (collapsed = !collapsed)"
      /><span>ES6用例</span></div>
    <a-menu theme="dark" mode="inline" :default-selected-keys="selectedKey" @click="changeMenu">
      <a-menu-item v-for="item in list" :key="item.index">
        <a-icon :type="item.icon" />
        <span class="nav-text">{{item.name}}</span>
      </a-menu-item>
    </a-menu>
  </div>
</template>

<script>
export default {
  name: 'Menu',
  data () {
    return {
      collapsed: false,
      title: 'ES6用例',
      selectedKey: ['1']
    }
  },
  watch: {
    '$route' () {
      // 路由变化时,获取active
      this.getActiveIndex()
    }
  },
  computed: {
    list () {
      return [
        {
          name: '代码调试',
          index: '0',
          icon: 'user',
          path: '/code'
        },
        {
          name: '解构赋值',
          index: '1',
          icon: 'user',
          path: '/destructuring'
        },
        {
          name: '字符串扩展',
          index: '2',
          icon: 'calendar',
          path: '/string'
        },
        {
          name: '函数的扩展',
          index: '3',
          icon: 'appstore',
          path: '/function'
        }
      ]
    }
  },
  methods: {
    changeMenu (item) {
      if (item) {
        let currentItem = this.list.find(n => n.index === item.key)
        if (currentItem) {
          if (currentItem.path) {
            this.$router.push({
              path: currentItem.path
            })
          }
        }
      }
      console.log(item)
    },
    getActiveIndex () {
      let list = this.list
      let route = this.$route
      console.log(route)
      if (list && list.length > 0) {
        for (let item of list) {
          if (item.list && item.list.length > 0) {
            this.getActiveIndex(item.list)
          } else {
            // 判断路由的path是否相同
            if (item.path && route.path === item.path) {
              this.selectedKey = [item.index]
              break
            }

            // 兼容路由用name的情况
            // if (item.to.name && route.name === item.to.name) {
            //   this.active = item.index
            //   break
            // }
          }
        }
      }
    }
  },
  mounted () {
    this.getActiveIndex()
  }

}
</script>

<style scoped lang="less">
.left-menu{
  overflow: auto;
  height: 100vh;
  width:200px;
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
</style>
