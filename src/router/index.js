import Vue from 'vue'
import Router from 'vue-router'
import headerComponent from '../components/index/header.vue'
// import homeComponent from '@/components/home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'header',
      component: headerComponent
    }
  ]
})
