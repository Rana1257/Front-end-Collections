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
    //   children: [
    //     {
    //       path: '/0',
    //       component: introductionComponent
    //     },
    //     {
    //       path: '/1',
    //       component: contentComponent
    //     },
    //     {
    //       path: '/2',
    //       component: interviewComponent
    //     }
    //   ]
    }
  ]
})
