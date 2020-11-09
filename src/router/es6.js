export default [
  {
    path: '/destructuring',
    name: 'Destructuring',
    component: () => import('@/views/es6/destructuring/Index'),
    meta: {
      title: '解构赋值'
    }
  },
  {
    path: '/string',
    name: 'String',
    component: () => import('@/views/es6/string/Index'),
    meta: {
      title: '字符串'
    }
  },
  {
    path: '/function',
    name: 'Function',
    component: () => import('@/views/es6/function/Index'),
    meta: {
      title: '函数'
    }
  }
]
