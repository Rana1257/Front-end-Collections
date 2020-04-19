import Vue from 'vue'
import Router from 'vue-router'
import headerComponent from '@/components/header'
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
