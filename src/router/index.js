import Vue from 'vue'
import Router from 'vue-router'
import button from './button'
import es6 from './es6'
Vue.use(Router)

let routes = [
  {
    path: '/index',
    name: 'Index',
    component: () => import('@/views/Index'),
    meta: {
      title: '首页'
    }
  },
  ...button,
  ...es6
]

export default new Router({
  mode: 'history',
  base: '/es6',
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop
      }
      return { x: 0, y: to.meta.savedPosition || 0 }
    }
  }
})
