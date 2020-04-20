<template>
    <div class="header">
        <!-- <router-link to="/">
            <el-page-header title="前端基础与进阶指南" class="header-title"></el-page-header>
        </router-link> -->
        <el-menu class="header-menu">
            <el-menu-item index="1" class="title">前端基础与进阶指南</el-menu-item>
            <el-menu-item index="2" class="blank"></el-menu-item>
            <el-menu-item index="3" class="linkToIndex">指南</el-menu-item>
            <el-menu-item index="4" class="linkToGithub" @click="handelLinkToGithub">Github</el-menu-item>
        </el-menu>
    </div>
</template>

<script>
export default {
  name: 'headerComponent',
  data () {
    return {
      titleText: '前端基础与进阶指南 '
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
    .header >>> .el-menu
        width 100%
        height 60px
        display flex
        border 0
        .title
            flex 0 0 200px
        .blank
            flex 1
            visibility hidden
        .linkToIndex
            flex 0 0 100px
        .linkToGithub
            flex 0 0 100px
</style>
