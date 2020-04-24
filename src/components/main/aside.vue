<template>
    <div class="aside">
        <el-row>
            <el-col>
                <el-menu
                :unique-opened="uniqueOpen"
                :default-active="this.$router.path"
                router
                >
                    <el-submenu v-for="titles in content" :key="titles.id" :index="titles.routerId">
                            <template slot="title">
                                <span>{{titles.title}}</span>
                            </template>
                        <!-- <el-menu-item-group v-for="(item, index) in titles.subTitle" :key="index" :index="index"  @click.native="handelClick(titles.menuId, index)">
                            <el-menu-item>{{item}}</el-menu-item>
                        </el-menu-item-group> -->
                    </el-submenu>
                </el-menu>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
  name: 'asideComponent',
  data () {
    return {
      content: [
        {id: 1, routerId: '/main/1', title: '简介', subTitle: ['前言', '为什么会有这个项目', '总结']},
        {id: 2, routerId: '/main/2', title: '双向数据绑定', subTitle: ['前言', '为什么会有这个项目', '总结']},
        {id: 3, routerId: '/', title: 'null', subTitle: ['test1', 'test2', 'test3']}
      ],
      uniqueOpen: true,
      openRouter: true
    }
  }
}
</script>

<style lang="stylus" scoped>
    .aside
        position absolute
        left 0
        top 100px
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
