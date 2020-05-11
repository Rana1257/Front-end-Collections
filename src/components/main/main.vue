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
                            <template slot="title">
                                <span>{{titles.title}}</span>
                            </template>
                        </el-menu-item>
                    </el-menu>
                </el-col>
            </el-row>
            <content-component :url="currentUrl"></content-component>
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
        {id: 0, title: '简介'},
        {id: 1, title: 'JS运行机制'},
        {id: 2, title: 'JS的异步'},
        {id: 3, title: '跨域'},
        {id: 4, title: '双向数据绑定'},
        {id: 5, title: '面经汇总'},
        {id: 6, title: '前端性能优化'},
        {id: 7, title: '时间与空间复杂度分析'},
        {id: 8, title: '树、二叉树、二叉搜索树'},
        {id: 9, title: '递归思维'},
        {id: 10, title: '牛客网 - 剑指offer'}
      ],
      uniqueOpen: true,
      currentUrl: ''
    }
  },
  methods: {
    asideClickHandler (id) {
      let url = String(this.content[id].title)
      this.$router.push({path: `/main/${url}`})
      this.currentUrl = url
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
