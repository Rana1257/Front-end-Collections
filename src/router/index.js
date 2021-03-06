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
      path: '/main/简介',
      component: main
    },
    {
      path: '/main/JS运行机制',
      component: main
    },
    {
      path: '/main/跨域',
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
    },
    {
      path: '/main/时间与空间复杂度分析',
      component: main
    },
    {
      path: '/main/树、二叉树、二叉搜索树',
      component: main
    },
    {
      path: '/main/递归思维',
      component: main
    },
    {
      path: '/main/牛客网 - 剑指offer',
      component: main
    },
    {
      path: '/main/JS学习记录',
      component: main
    }
  ]
})
