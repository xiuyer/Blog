<template>
  <div class="column">
    <article>
      <h1><i class="iconfont">&#xe609;</i>阅读排行<span>more <i class="iconfont">&#xe617;</i></span></h1>
      <columnItem type="readcount"></columnItem>
    </article>
    <article class="new">
      <h1><i class="iconfont">&#xe60a;</i>大家喜欢<span>more <i class="iconfont">&#xe617;</i></span></h1>
      <columnItem type="favorite"></columnItem>
    </article>
  </div>
</template>
<script>
import columnItem from './columnItem'
export default {
  name: 'column',
  components: {
    columnItem
  }
}
</script>
