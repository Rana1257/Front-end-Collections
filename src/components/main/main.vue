<template>
    <div>
        <el-main v-loading="loading">
            <aside-component></aside-component>
            <content-component></content-component>
        </el-main>
    </div>
</template>

<script>
import asideComponent from './aside'
import contentComponent from './content'
export default {
  name: 'mainComponent',
  data () {
    return {
      name: 'MAIN',
      loading: true
    }
  },
  components: {
    asideComponent,
    contentComponent
  },
  mounted () {
    this.loading = false
  }
}
</script>

<style lang="stylus" scoped>

</style>
