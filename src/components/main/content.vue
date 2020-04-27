<template>
    <div>
        <vue-markdown class="mdClass markdown-body" :source="markdownText"></vue-markdown>
        <el-backtop></el-backtop>
    </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import No0 from '../../../static/0.md'
import No1 from '../../../static/1.md'
// import axios from 'axios'
import 'github-markdown-css'
export default {
  name: 'contentComponent',
  props: {
    id: Number
  },
  components: {
    VueMarkdown
  },
  data () {
    return {
      markdownText: '',
      index: 0,
      url: ''
    }
  },
  watch: {
    id: function (id) {
      this.index = this.id
      this.url = 'static/' + this.index + '.md'
      this.markdownText = No1
    }
  },
  created () {
    this.index = this.id
    this.url = 'static/' + this.index + '.md'
    this.markdownText = No0
    // axios
    //   .get(this.url)
    //   .then(response => {
    //     this.markdownText = response.data
    //   })
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
