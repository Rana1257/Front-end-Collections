<template>
    <div class="main">
        <el-main>
            <el-row class="aside">
                <el-col>
                    <el-menu
                    :unique-opened="uniqueOpen"
                    default-active="0"
                    >
                        <el-menu-item
                        v-for="titles in content"
                        :key="titles.id"
                        :index="String(titles.id)"
                        v-on:click="asideClickHandler(titles.id)">
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
            <content-component :id="currentId"></content-component>
            <!-- <router-view></router-view> -->
        </el-main>
    </div>
</template>

<script>
import contentComponent from './content.vue'

export default {
  name: 'mainComponent',
  components: {
    contentComponent
  },
  data () {
    return {
      name: 'MAIN',
      content: [
        {id: 0, title: '简介', subTitle: ['前言', '为什么会有这个项目', '总结']},
        {id: 1, title: 'JS运行机制', subTitle: ['前言', '为什么会有这个项目', '总结']},
        {id: 2, title: 'JS的异步', subTitle: ['前言', '为什么会有这个项目', '总结']},
        {id: 3, title: '双向数据绑定', subTitle: ['前言', '为什么会有这个项目', '总结']},
        {id: 4, title: '面经汇总', subTitle: ['前言', '为什么会有这个项目', '总结']}
      ],
      uniqueOpen: true,
      currentId: 0
    }
  },
  methods: {
    asideClickHandler (id) {
      this.currentId = id
    }
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
    .aside >>> .is-active
        color #3eaf7c
    .aside >>> .el-submenu__title
        padding-left 0
        font-weight 700
    .aside >>> .el-menu-item-group__title
        padding 0
</style>
