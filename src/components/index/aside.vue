<template>
    <div class="aside">
        <el-row>
            <el-column>
                <el-menu>
                    <el-menu-item index="2">
                        <!-- <i class="el-icon-menu"></i> -->
                        <span slot="title">前言</span>
                    </el-menu-item>
                </el-menu>
            </el-column>
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
        top 70px
    .aside >>> .el-menu
        width 200px
        border-right 0
</style>
