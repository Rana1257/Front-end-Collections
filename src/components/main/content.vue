<template>
    <div>
        <el-backtop><span class="arrow"></span></el-backtop>
        <vue-markdown class="mdClass markdown-body" :source="markdownText"></vue-markdown>
    </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import introduction from '../../../static/简介.md'
import 'github-markdown-css'

export default {
  name: 'contentComponent',
  props: {
    url: String
  },
  components: {
    VueMarkdown
  },
  watch: {
    async url (idFromParent) {
      const url = this.url
      this.markdownText = await import('../../../static/' + url + '.md')
    },
    '$route.path': function (value) {
      let routerUrl = value.split('/')[2]
      if (routerUrl !== this.url) {
        this.url = routerUrl
      }
    }
  },
  data () {
    return {
      markdownText: introduction
    }
  },
  created () {
    this.$router.push({path: `/main/简介`})
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
