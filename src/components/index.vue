<template>
  <div>
    <section class="container mt110 clearfix">
      <banner></banner>
      <div class="blog-about">
        <article class="search">
          <h1>搜索本站</h1>
          <p>
            <input type="text" v-model="searchTxt"><router-link :to="`/articlelist/search?para=${searchTxt}`"><i class="iconfont">&#xe6a8;</i></router-link>
          </p>
        </article>
        <article class="about">
          <h1>关于博客</h1>
          <p>lolowu：名字取自陋室铭，愿本站能成为一个前端学习者交流学习的园地，以期“山不在高，有仙则名”。</p>
          <p>本站采用Vue.js+Node.js+Mysql搭建，前后端分离，欢迎感兴趣的朋友交流学习。</p>
          <p>源码地址：<a href="https://github.com/xiuyer/Blog.git" target="_blank">https://github.com/xiuyer/Blog.git</a></p>
        </article>
      </div>
    </section>
    <section class="content container mt20">
      <listCom type="all"></listCom>
      <column></column>
    </section>
  </div>
</template>
<script>
import banner from './mods/banner'
import listCom from './mods/listComponent'
import column from './mods/column'
export default {
  name: 'index',
  data () {
    return {
      searchTxt: ''
    }
  },
  components: {
    banner,
    listCom,
    column
  }
}
</script>
