<template>
  <div id="app">
    <header-component></header-component>
    <router-view/>
  </div>
</template>

<script>
import headerComponent from './components/index/header'
import homeComponent from './components/index/home'
import Loading from 'element-ui/lib/loading'
import store from './store/index'

const showLoading = store.getters.returnShowLoading

const options = {
  lock: true
}

let loadingInstance = Loading.service(options)

if (showLoading === false) {
  loadingInstance.close()
}

export default {
  name: 'App',
  components: {
    homeComponent,
    headerComponent
  },
  created () {
    store.commit('changeShowLoadingAsTrue')
  }
}
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    }
</style>
