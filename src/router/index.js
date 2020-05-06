import Vue from 'vue'
import Router from 'vue-router'
import homeComponent from '../components/index/home.vue'
// import store from '../store/index'

const main = () => {
  return import('../components/main/main.vue')
}

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: homeComponent
    },
    {
      path: '/main',
      component: main
    },
    {
      path: '/main/简介',
      component: main
    },
    {
      path: '/main/JS运行机制',
      component: main
    },
    {
      path: '/main/JS的异步',
      component: main
    },
    {
      path: '/main/双向数据绑定',
      component: main
    },
    {
      path: '/main/面经汇总',
      component: main
    },
    {
      path: '/main/前端性能优化',
      component: main
    }
  ]
})
