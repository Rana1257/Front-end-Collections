import Vue from 'vue'
import Router from 'vue-router'
import homeComponent from '../components/index/home.vue'
import mainComponent from '../components/main/main.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: homeComponent
    },
    {
      path: '/main',
      name: 'main',
      component: mainComponent
    }
  ]
})
