import Vue from 'vue'
import Router from 'vue-router'
import homeComponent from '../components/index/home.vue'
import mainComponent from '../components/main/main.vue'
import contentComponent from '../components/main/content.vue'
import introductionComponent from '../components/main/introduction.vue'
import interviewComponent from '../components/main/interview_qiniu.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: homeComponent
    },
    {
      path: '/main',
      component: mainComponent,
      children: [
        {
          path: '/0',
          component: introductionComponent
        },
        {
          path: '/1',
          component: contentComponent
        },
        {
          path: '/2',
          component: interviewComponent
        }
      ]
    }
  ]
})
