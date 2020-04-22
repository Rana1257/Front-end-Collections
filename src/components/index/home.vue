<template>
    <div>
        <el-main class="main">
            <img src="../../assets/logo.png">
            <h1>
                {{welcomeText}}
            </h1>
            <h2>
                {{explainationText}}
            </h2>
        </el-main>
        <router-link to="/main">
            <el-button>START</el-button>
        </router-link>
    </div>
</template>

<script>

export default {
  name: 'homeComponent',
  data () {
    return {
      welcomeText: 'Front end Collections',
      explainationText: 'An Easy way to improve your skills'
    }
  }
}
</script>

<style lang="stylus" scoped>
    main
        display flex
        flex-direction column
        justify-content center
        flex-wrap wrap
        img
            width 200px
            height 200px
            margin 0 auto
        h1
            color #304455
        h2
            color #6a8bad
</style>
