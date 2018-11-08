<template>
  <section class="content container mt110 mb20">
    <div class="main mb20">
      <div class="guestbook clearfix">
        <h2>给我留言</h2>
        <textarea name="" id="" cols="80" rows="8" v-model="comTxt"></textarea>
        <input type="button" value="发布" @click="commentFn">
      </div>
      <comment type="guestbook" id="0" ref="comment"></comment>
    </div>
    <column></column>
  </section>
</template>
<script>
import comment from './mods/comment'
import {mapState} from 'vuex'
import axios from 'axios'
import column from './mods/column'
export default {
  name: 'guestbook',
  data () {
    return {
      comTxt: ''
    }
  },
  components: {
    comment,
    column
  },
  computed: {
    ...mapState([
      'userInfo'
    ])
  },
  methods: {
    commentFn () {
      if (!this.userInfo.isLogin) {
        alert('请先登录!')
        return
      }
      let comData = {
        content: this.comTxt,
        artId: 0,
        authorId: this.userInfo.id,
        authorName: this.userInfo.nickname,
        comId: 0,
        preComId: 0
      }
      axios.post('/api/comment', {
        type: 'insert',
        data: comData
      }).then((res) => {
        if (res.data.isOk) {
          this.$refs.comment.getData()
          this.comTxt = ''
        } else {
          alert('你的回复被外星人劫走了，请稍后再试。')
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>
