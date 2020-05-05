<template>
  <div id="app">
    <header-component></header-component>
    <router-view/>
  </div>
</template>

<script>
import headerComponent from './components/index/header'
import homeComponent from './components/index/home'

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
    }
</style>
