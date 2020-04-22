<template>
    <div class="content">
        <header>
            <h1 class="topHeader">{{content.headerTitle}}</h1>
            <p>{{content.headerContent}}</p>
        </header>
        <br>
        <section v-for="sectionData in content.section" :key="sectionData.sectionId">
            <h3>{{sectionData.sectionTitle}}</h3>
            <p>{{sectionData.sectionContent}}</p>
        </section>
        <br>
    </div>
</template>

<script>
export default {
  name: 'contentComponent',
  data () {
    return {
      content:
        {
          id: 1,
          headerTitle: '前言',
          headerContent: '本部分将阐述此项目的主要内容，以及创建该项目的原因和意义。',
          section: [
            {sectionId: 1, sectionTitle: '主要内容', sectionContent: '本项目预计将包括以下几个部分：前端基础、Javascript深入、前端框架(Vue)、计算机网络、数据结构和算法。虽然暂时一个部分都没完成（笑），不过只要你相信，总有一天我会写完的。'},
            {sectionId: 2, sectionTitle: '前端基础', sectionContent: '前端基础将包括前端三大内容：HTML，CSS，JavaScript，包括ES6。这些基础部分的内容非常重要，毕竟如果一个前端程序员基础不牢固，那么他以后在工作中肯定会收到影响。这一部分会罗列出一些重点，帮助大家更快地上手。'},
            {sectionId: 3, sectionTitle: 'Javascript深入', sectionContent: 'Javascript是前端基础里面的重点和难点，它和我之前接触过的其他语言（Python）有很大的不同，我在学习的过程中也踩过不少坑。这一部分我会把我认为初学者会感到疑惑的内容，尽可能地以通俗易懂，并且细致入微地说明清楚。'},
            {sectionId: 4, sectionTitle: '前端框架', sectionContent: '现在的前端工作都不仅仅要求你熟悉HTML，CSS，JavaScript，更要求你有前端框架（React，Vue等等）的使用经验。因此，框架原理和实战，是前端学习之路上必须要越过去的坎。这个项目本身也是使用Vue制作出来的，如果你对它的实现感兴趣，欢迎前往我的Github首页。'},
            {sectionId: 5, sectionTitle: '计算机网络', sectionContent: '计算机网络也是前端人员必备的知识点之一，特别是对于向我这样的通信工程专业的学生。不会计算机网络，等同于向别人说明你大学上课没有认真听，或者听了就忘。不过不用担心，我会带你回忆起相关的知识，本部分将包括HTTP协议，传输层协议等。'},
            {sectionId: 6, sectionTitle: '数据结构和算法', sectionContent: '数据结构应该算是计算机专业学生的基本功，虽然可能你学完大学课程之后就还给老师了，不过数据结构也是每个程序员的必备基础知识。算法相关的题在前端面试中的比重越来越高，当然最有效的方法是去LeetCode上刷题，毕竟动手操作写代码是每个程序员的基本功。'}]
        }
    }
  }
}
</script>

<style lang="stylus" scoped>
    .content
        margin-left 15%
        margin-right 5%
        text-align left
        .topHeader
            padding-bottom 10px
            border-bottom 1px solid #cccccc

</style>
