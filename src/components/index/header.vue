<template>
    <div class="header">
        <el-menu class="header-menu">
            <router-link to="/">
                <el-menu-item index="1" class="title">{{titleText}}</el-menu-item>
            </router-link>
            <el-menu-item index="2" class="blank"></el-menu-item>
            <el-menu-item index="4" class="linkToGithub" @click="handelLinkToGithub">Github</el-menu-item>
        </el-menu>
    </div>
</template>

<script>
export default {
  name: 'headerComponent',
  data () {
    return {
      titleText: 'Front end Collections '
    }
  },
  methods: {
    handelLinkToGithub () {
      window.location = 'https://github.com/Rana1257/Front-end-Collections'
    }
  }
}
</script>

<style lang="stylus" scoped>
    .router-link-active
        text-decoration none
    .header >>> .el-page-header__title
        font-size 16px
        color #304455
        height 60px
        line-height 60px
    .header
        border-bottom 1px solid #ecf8f3
    .header >>> .el-menu
        width 100%
        height 60px
        display flex
        border-right 0
        .title
            flex 0 0 25%
        .blank
            flex 1
            visibility hidden
        .linkToGithub
            flex 0 0 20%
</style>
