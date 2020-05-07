// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css'
import VueJsonp from 'vue-jsonp'
import Button from 'element-ui/lib/button'
import Main from 'element-ui/lib/main'
import Row from 'element-ui/lib/row'
import Col from 'element-ui/lib/col'
import Menu from 'element-ui/lib/menu'
import MenuItem from 'element-ui/lib/menu-item'
import Backtop from 'element-ui/lib/backtop'
import Loading from 'element-ui/lib/loading'

Vue.use(VueJsonp)
Vue.config.productionTip = false
Vue.use(Button)
Vue.use(Main)
Vue.use(Row)
Vue.use(Col)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Backtop)

const options = {
  text: 'Fetching data from Github servers...'
}

router.beforeEach((to, from, next) => {
  if (to.path === '/main/简介' && from.path === '/') {
    Loading.service(options)
    next()
  } else {
    next()
  }
})
router.afterEach((to, from) => {
  if (to.path === '/main/简介' && from.path === '/') {
    Loading.service(options).close()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
