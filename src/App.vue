<template>
  <div id="app">
    <header-component></header-component>
    <img src="./assets/logo.png">
    <home-component></home-component>
    <!-- <router-view/> -->
    <el-button>START</el-button>

  </div>
</template>

<script>
import headerComponent from './components/header'
import homeComponent from './components/home'

export default {
  name: 'App',
  components: {
    homeComponent,
    headerComponent
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
