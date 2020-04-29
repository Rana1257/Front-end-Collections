<template>
    <div>
        <vue-markdown class="mdClass markdown-body" :source="markdownText"></vue-markdown>
        <el-backtop></el-backtop>
    </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import No2 from '../../../static/2.md'
// import axios from 'axios'
import 'github-markdown-css'
export default {
  name: 'interviewComponent',
  components: {
    VueMarkdown
  },
  data () {
    return {
      markdownText: No2
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
