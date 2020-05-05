// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import 'element-ui/lib/theme-chalk/index.css'
import VueJsonp from 'vue-jsonp'
import Button from 'element-ui/lib/button'
import Main from 'element-ui/lib/main'
import Row from 'element-ui/lib/row'
import Col from 'element-ui/lib/col'
import Menu from 'element-ui/lib/menu'
import MenuItem from 'element-ui/lib/menu-item'
import Backtop from 'element-ui/lib/backtop'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(VueJsonp)
Vue.config.productionTip = false
Vue.use(Button)
Vue.use(Main)
Vue.use(Row)
Vue.use(Col)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Backtop)

router.beforeEach((to, from, next) => {
  // 开始进度条
  NProgress.start()
  // 继续路由
  next()
})
router.afterEach(transition => {
  // 结束进度条
  NProgress.done()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
