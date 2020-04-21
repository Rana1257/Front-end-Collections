<template>
    <div class="aside">
        <el-row>
            <el-col>
                <el-menu>
                    <el-menu-item index="1">
                        <!-- <i class="el-icon-menu"></i> -->
                        <span slot="title">前言</span>
                    </el-menu-item>
                    <el-menu-item index="2">
                        <!-- <i class="el-icon-menu"></i> -->
                        <span slot="title">aside2</span>
                    </el-menu-item>
                    <el-menu-item index="3">
                        <!-- <i class="el-icon-menu"></i> -->
                        <span slot="title">aside2</span>
                    </el-menu-item>
                    <el-menu-item index="4">
                        <!-- <i class="el-icon-menu"></i> -->
                        <span slot="title">aside2</span>
                    </el-menu-item>
                    <el-menu-item index="5">
                        <!-- <i class="el-icon-menu"></i> -->
                        <span slot="title">aside2</span>
                    </el-menu-item>
                    <el-menu-item index="6">
                        <!-- <i class="el-icon-menu"></i> -->
                        <span slot="title">aside2</span>
                    </el-menu-item>
                    <el-menu-item index="7">
                        <!-- <i class="el-icon-menu"></i> -->
                        <span slot="title">aside2</span>
                    </el-menu-item>
                    <el-menu-item index="8">
                        <!-- <i class="el-icon-menu"></i> -->
                        <span slot="title">aside2</span>
                    </el-menu-item>
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
    .aside >>> .el-menu
        width 200px
        border-right 0
</style>
