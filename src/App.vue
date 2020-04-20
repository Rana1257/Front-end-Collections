<template>
  <div id="app">
    <header-component></header-component>
    <!-- <aside-component></aside-component> -->
    <home-component></home-component>
    <!-- <router-view/> -->
    <el-button>START</el-button>

  </div>
</template>

<script>
import headerComponent from './components/index/header'
import homeComponent from './components/index/home'
import asideComponent from './components/index/aside'

export default {
  name: 'App',
  components: {
    homeComponent,
    headerComponent,
    asideComponent
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
