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
    //   beforeEnter: (to, from, next) => {
    //     console.log('Start loading')
    //     store.dispatch('onLoading', true)
    //     next()
    //   }
    }
  ]
})
