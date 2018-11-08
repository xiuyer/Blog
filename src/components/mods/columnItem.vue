<template>
  <ul>
    <li v-for="(item,index) in articleData" :key="index">
      <i>{{index+1}}</i>
      <router-link :to="`/article_${item.id}.html`">{{item.title}}</router-link>
      <i class="iconfont" v-html="icon"></i>
      <span>{{item[type]}}</span>
    </li>
  </ul>
</template>
<script>
import axios from 'axios'
export default {
  name: 'columnItem',
  props: ['type'],
  data () {
    return {
      articleData: [],
      icon: this.type === 'readcount' ? '&#xe600;' : '&#xe64a;'
    }
  },
  created () {
    axios.get('/api/article', {
      params: {
        type: this.type,
        start: 0,
        count: 10
      }
    }).then((res) => {
      if (res.data.isOk) {
        this.articleData = res.data.result
      }
    }).catch((err) => {
      console.log(err)
    })
  }
}
</script>
