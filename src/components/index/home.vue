<template>
    <div>
        <el-main>
            <img src="../../assets/logo.png">
            <h1>
                {{welcomeText}}
            </h1>
            <h3>
                {{explainationText}}
            </h3>
        </el-main>
    </div>
</template>

<script>

export default {
  name: 'homeComponent',
  data () {
    return {
      welcomeText: '前端基础与进阶指南',
      explainationText: '愿在你的前端道路上助你一臂之力'
    }
  }
}
</script>

<style lang="stylus" scoped>
    h1
        color #304455
</style>
