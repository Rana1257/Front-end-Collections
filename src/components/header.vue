<template>
    <div id="header">
        <router-link to="/">
            <header>
                {{titleText}}
            </header>
        </router-link>
    </div>
</template>

<script>
export default {
  name: 'headerComponent',
  data () {
    return {
      titleText: '前端基础与进阶指南 '
    }
  }
}
</script>

<style lang="stylus" scoped>
    .router-link-active
        text-decoration none

    #header
        width 100%
        height 60px
        position absolute
        top 0
        left 0
        text-align left
        background-color #cccccc
        header
            padding 10px 20px
            color #304455
</style>
