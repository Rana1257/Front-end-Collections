<template>
    <div class="aside">
        <el-row>
            <el-col>
                <el-menu>
                    <el-submenu index="1">
                        <template slot="title">
                            <span>前言</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="1-1">主要内容</el-menu-item>
                            <el-menu-item index="1-2">为什么会有这个项目</el-menu-item>
                            <el-menu-item index="1-3">总结</el-menu-item>
                        </el-menu-item-group>
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
      name: 'Aside'
    }
  },
  methods: {
    handleOpen () {
      console.log('OPEN')
    },
    handleClose () {
      console.log('CLOSE')
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
        font-weight 700
</style>
