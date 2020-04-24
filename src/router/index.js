import Vue from 'vue'
import Router from 'vue-router'
import homeComponent from '../components/index/home.vue'
import mainComponent from '../components/main/main.vue'
import contentComponent from '../components/main/content.vue'
import VueComponent from '../components/main/vue1.vue'

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
          path: 'content',
          component: contentComponent
        }, {
          path: 'vue',
          component: VueComponent
        }
      ]
    }
  ]
})
