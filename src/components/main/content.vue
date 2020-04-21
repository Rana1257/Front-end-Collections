<template>
    <div class="content">
        <header>
            <h1>{{mainHeader}}</h1>
            <article>{{mainContent}}</article>
        </header>
        <acticle v-for="item in main" :key="item.id">
            <h2>{{item.subHeader}}</h2>
            <article>{{item.subContent}}</article>
        </acticle>
    </div>
</template>

<script>
export default {
  name: 'contentComponent',
  data () {
    return {
      mainHeader: '指南使用说明',
      mainContent: '',
      main: [
        {id: 1, subHeader: '指南内容概览', subContent: '本指南预计将包括七大部分，分别为：HTML5、CSS、Javascript、Javascript(ES6)、计算机网络、前端框架(Vue)、数据结构和算法。'},
        {id: 2, subHeader: '模块概览', subContent: '本项目会分为七大模块，分别为：前端基础、框架解读、工程化、性能优化、计算机基础、Typescript、细分领域。'},
        {id: 3, subHeader: '模块概览', subContent: '本项目会分为七大模块，分别为：前端基础、框架解读、工程化、性能优化、计算机基础、Typescript、细分领域。'},
        {id: 4, subHeader: '模块概览', subContent: '本项目会分为七大模块，分别为：前端基础、框架解读、工程化、性能优化、计算机基础、Typescript、细分领域。'}
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
    .content
        margin-left 250px
        width 60%
        text-align left
</style>
