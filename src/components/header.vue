<template>
    <div class="header">
        <router-link to="/">
            <el-page-header title="前端基础与进阶指南">
                <!-- {{titleText}} -->
            </el-page-header>
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
    .header >>> .el-page-header__title
        font-size 16px
        color #304455

</style>
