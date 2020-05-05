import Vue from 'vue'
import Router from 'vue-router'
import homeComponent from '../components/index/home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: homeComponent
    },
    {
      path: '/main',
      component: () => import('../components/main/main.vue')
    }
  ]
})
