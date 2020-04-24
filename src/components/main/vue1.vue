<template>
    <div>
        <el-backtop></el-backtop>
        <div class="content" v-for="contentData in content" :key="contentData.id">
            <header>
                <h1 class="topHeader">{{contentData.headerTitle}}</h1>
                <p>{{contentData.headerContent}}</p>
            </header>
            <br>
            <section v-for="sectionData in contentData.section" :key="sectionData.sectionId">
                <h3>{{sectionData.sectionTitle}}</h3>
                <p v-for="item in sectionData.sectionContent" :key="item.id">{{item.text}}</p>
                <br>
            </section>
            <br>
        </div>
    </div>
</template>

<script>
export default {
  name: 'VueComponent',
  data () {
    return {
      content: [
        {
          id: 1,
          headerTitle: 'Vue双向数据绑定',
          headerContent: '',
          section: [
            {sectionId: 1, sectionTitle: '主要内容', sectionContent: [{textId: 1, text: '本项目预计将包括以下几个部分：前端基础、Javascript深入、前端框架(Vue)、计算机网络、数据结构和算法。'}, {textId: 2, text: '虽然暂时一个部分都没完成（笑），不过只要你相信，总有一天我会写完的。'}]},
            {sectionId: 2, sectionTitle: '前端基础', sectionContent: [{textId: 1, text: '前端基础将包括前端三大内容：HTML，CSS，JavaScript，包括ES6。这些基础部分的内容非常重要，毕竟如果一个前端程序员基础不牢固，那么他以后在工作中肯定会收到影响。这一部分会罗列出一些重点，帮助大家更快地上手。'}]},
            {sectionId: 3, sectionTitle: 'Javascript深入', sectionContent: [{textId: 1, text: 'Javascript是前端基础里面的重点和难点，它和我之前接触过的其他语言（Python）有很大的不同，我在学习的过程中也踩过不少坑。这一部分我会把我认为初学者会感到疑惑的内容，尽可能地以通俗易懂，并且细致入微地说明清楚。'}]},
            {sectionId: 4, sectionTitle: '前端框架', sectionContent: [{textId: 1, text: '现在的前端工作都不仅仅要求你熟悉HTML，CSS，JavaScript，更要求你有前端框架（React，Vue等等）的使用经验。因此，框架原理和实战，是前端学习之路上必须要越过去的坎。这个项目本身也是使用Vue制作出来的，如果你对它的实现感兴趣，欢迎前往我的Github首页。'}]},
            {sectionId: 5, sectionTitle: '计算机网络', sectionContent: [{textId: 1, text: '计算机网络也是前端人员必备的知识点之一，特别是对于向我这样的通信工程专业的学生。不会计算机网络，等同于向别人说明你大学上课没有认真听，或者听了就忘。不过不用担心，我会带你回忆起相关的知识，本部分将包括HTTP协议，传输层协议等。'}]},
            {sectionId: 6, sectionTitle: '数据结构和算法', sectionContent: [{textId: 1, text: '数据结构应该算是计算机专业学生的基本功，虽然可能你学完大学课程之后就还给老师了，不过数据结构也是每个程序员的必备基础知识。'}, {textId: 2, text: '算法相关的题在前端面试中的比重越来越高，当然最有效的方法是去LeetCode上刷题，毕竟动手操作写代码是每个程序员的基本功。'}]}
          ]
        },
        {
          id: 2,
          headerTitle: '为什么会有这个项目',
          headerContent: '在我学习前端的过程中，经常会在网上搜索一些问题的答案，也在许多地方看到过前端知识点的汇总，以及前端面试的攻略等等。然而，当我真正参加面试的时候，就发现光靠背诵知识点，是没有办法通过考核的。虽然基础的问题能够通过背诵解决，但是一旦面试官继续深入问下去，往往就无法回答上来了。因此，重要的是去理解这些知识点，而不是靠记忆。',
          section: [
            {sectionId: 1, sectionTitle: '', sectionContent: [{textId: 1, text: '此外，网上的资料鱼龙混杂。虽然我承认的确存在一些优秀的内容，然而大部分内容都存在一定问题：'}]},
            {sectionId: 2, sectionTitle: '大量的过时问题', sectionContent: [{textId: 1, text: '现在搜索前端性能优化的处理方法,依然充斥着大量的雅虎军规,雅虎军规本身没问题，这是曾经的互联网巨头在大量实践中总结的宝贵经验。'}, {textId: 2, text: '问题是，雅虎都快没了，这些法则已经诞生超过十年了(我见过最早的中文版雅虎军规是2006年的),其中很多条"军规"早已经成为了日常操作,比如静态资源上 CDN,这在 10 年前算是时髦的事情,但是现在早已经司空见惯,再比如什么减少对 DOM 访问,css 放 head 标签,这种操作适用于史前前端,如今正常的项目基本都是上框架,操作 DOM 的机会本来就不多,而且工程化之后 webpack 自动打包,什么资源放哪都已经被集成了。'}, {textId: 3, text: '当然知道这些是有用的,问题是现在已经属于常识中的常识,试问,面试官问你前端性能优化,你上来背雅虎军规,什么少动 dom,上 cdn之类的,如果我是面试官给我的印象是,这个人没做过性能优化,只是网上搜了搜背了背而已'}]},
            {sectionId: 3, sectionTitle: '深入浅出的不多', sectionContent: [{textId: 1, text: '我看到很多项目整理了大量的面试题，但是解读部分非常草率，就比如前端性能优化这种问题，后面列了几条雅虎军规就了事了，这种解读的意义跟没有一样，单纯的罗列问题和罗列答案，不把东西讲清楚。'}, {textId: 1, text: '还有深入的部分，不得不说互联网上还是有非常多有深度的文章的，尤其是一些大厂的团队作品质量都有保证，但是很多时候讲的太深并不是好事,典型的就是各种源码解读文章,作者搞没搞清楚我不清楚,但是绝大多数读者肯定没有被“解读”清楚，除了源码晦涩难懂之外，文章大量罗列代码+一行注释这种写法不像是在解读，像是在做批注'}]},
            {sectionId: 4, sectionTitle: '缺乏基础知识', sectionContent: [{textId: 1, text: '现在的前端面试项目依然是 js+css+html 的三剑客模式,配上框架部分,这样一看是没有错,这就是"前端"面试,但是前端首先是程序员或者说是软件工程师,这里欠缺了计算机的基础知识。'}, {textId: 2, text: '如果放在几年前,一个熟练运用三剑客+一种框架的前端在市场上是香喷喷,现在只能算是一个合格水平了,前端野蛮生长的时代已经过去了,各个大厂也回归理性,除了前端的专业问题外,计算机的基础知识必不可少,尤其是算法部分,当然网络、操作系统、编译原理也都有涉及。'}]}
          ]
        },
        {
          id: 3,
          headerTitle: '总结',
          headerContent: '',
          section: [
            {sectionId: 1, sectionTitle: '主要内容', sectionContent: [{id: 1, text: '本项目预计将包括以下几个部分：前端基础、Javascript深入、前端框架(Vue)、计算机网络、数据结构和算法。'}, {id: 2, text: '虽然暂时一个部分都没完成（笑），不过只要你相信，总有一天我会写完的。'}]}
          ]
        }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
    .content
        margin-left 15%
        margin-right 10%
        text-align left
        .topHeader
            padding-bottom 10px
            border-bottom 1px solid #cccccc
        p
            line-height 1.7

</style>
