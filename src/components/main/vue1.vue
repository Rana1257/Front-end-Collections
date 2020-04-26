<template>
    <div>
        <vue-markdown class="mdClass markdown-body">{{ msg }}</vue-markdown>
        <el-backtop></el-backtop>
    </div>
</template>

<script>
import vue双向数据绑定 from '../../assets/markdown/Vue/vue双向数据绑定.md'
import VueMarkdown from 'vue-markdown'
import 'github-markdown-css'
export default {
  name: 'VueComponent',
  components: {
    VueMarkdown
  },
  data () {
    return {
      msg: vue双向数据绑定
    }
  }
}
</script>

<style lang="stylus" scoped>
    .mdClass
        color #2c3e50
        margin-left 16%
        margin-right 10%
        text-align left
        line-height 1.7
    .markdown-body >>> a
            color #3eaf7c
</style>
