<template>
  <article class="about-blog">
    <div class="header">
      <img src="../../static/images/aboutTop.jpg"/>
    </div>
    <section class="about-content">
      <div class="about-contentTxt" v-html="txtData.details"></div>
    </section>
  </article>
</template>
<script>
import axios from 'axios'
export default {
  name: 'about',
  data () {
    return {
      txtData: '',
      para: this.$route.query.para
    }
  },
  created () {
    axios.get('/api/about', {
      params: {
        para: this.para
      }
    }).then((res) => {
      if (res.data.isOk) {
        this.txtData = res.data.result
      } else {
        this.txtData = '博主很懒，什么都没有写！'
      }
    }).catch((err) => {
      console.log(err)
    })
  }
}
</script>
