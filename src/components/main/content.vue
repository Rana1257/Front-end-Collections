<template>
    <div>
        <el-backtop><span class="arrow"></span></el-backtop>
        <vue-markdown class="mdClass markdown-body" :source="markdownText"></vue-markdown>

    </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import No0 from '../../../static/0.md'
import 'github-markdown-css'

export default {
  name: 'contentComponent',
  props: {
    id: Number
  },
  components: {
    VueMarkdown
  },
  watch: {
    async id (idFromParent) {
      const id = idFromParent
      switch (id) {
        case 0:
          this.markdownText = await import('../../../static/0.md')
          break
        case 1:
          this.markdownText = await import('../../../static/1.md')
          break
        case 2:
          this.markdownText = await import('../../../static/2.md')
          break
        case 3:
          this.markdownText = await import('../../../static/3.md')
          break
        case 4:
          this.markdownText = await import('../../../static/4.md')
          break
      }
    }
  },
  data () {
    return {
      markdownText: No0
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

    .arrow
        width 0
        height 0
        border-left 7px solid transparent
        border-right 7px solid transparent
        border-bottom 8px solid #42B983
</style>
