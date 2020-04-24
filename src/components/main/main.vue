<template>
    <div class="main">
        <el-main v-loading="loading">
            <el-row class="aside">
                <el-col>
                    <el-menu
                    :unique-opened="uniqueOpen"
                    :default-active="defaultActive"
                    :router="true"
                    >
                        <el-menu-item v-for="titles in content" :key="titles.id" :index="titles.routerId">
                            <!-- <router-link :to="titles.routerId"> -->
                            <template slot="title">
                                <span>{{titles.title}}</span>
                            </template>
                            <!-- <el-menu-item-group v-for="(item, index) in titles.subTitle" :key="index" :index="index"  @click.native="handelClick(titles.menuId, index)">
                                <el-menu-item>{{item}}</el-menu-item>
                            </el-menu-item-group> -->
                            <!-- </router-link> -->
                        </el-menu-item>
                    </el-menu>
                </el-col>
            </el-row>
            <router-view></router-view>
        </el-main>
    </div>
</template>

<script>
import asideComponent from './aside'
export default {
  name: 'mainComponent',
  data () {
    return {
      name: 'MAIN',
      loading: true,
      content: [
        {id: 1, routerId: '/main/content', title: '简介', subTitle: ['前言', '为什么会有这个项目', '总结']},
        {id: 2, routerId: '/main/vue', title: '双向数据绑定', subTitle: ['前言', '为什么会有这个项目', '总结']}
      ],
      uniqueOpen: true,
      defaultActive: '/main/content'
    }
  },
  components: {
    asideComponent
  },
  mounted () {
    this.loading = false
  }
}
</script>

<style lang="stylus" scoped>
    .main >>> .el-loading-spinner
        top 300px

    .aside
        position absolute
        left 0
        top 110px
        width 15%
        text-align left
    .aside >>> .el-menu
        border-right 0
    .aside >>> .el-icon-arrow-down
        opacity 0
    .aside >>> .el-menu-item
        overflow hidden
        white-space nowrap
        min-width 0
    .aside >>> .el-submenu__title
        padding-left 0
        font-weight 700
    .aside >>> .el-menu-item-group__title
        padding 0
</style>
