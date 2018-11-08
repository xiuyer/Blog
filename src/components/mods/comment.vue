<template>
  <section class="comment">
    <ul>
      <li class="clearfix" v-for="(item,index) in commetData" :key="index">
        <div class="comment-item">
          <div class="userlogo">
            <img :src="item.userImg" />
            <p class="username">{{item.author_nickname}}</p>
          </div>
          <div class="comment-txt">
            <p class="txt">{{item.content}}</p>
            <p class="time">{{gettime(item.time)}}
              <span @click="item.comShow = !item.comShow" v-show="item.child.length > 0">{{comShowMsg(item)}}({{item.child.length}})</span>
              <span @click="comItem(item, null)">回复</span>
            </p>
          </div>
        </div>
        <ul class="com-list" v-show="item.comShow">
          <li v-for="(itm,idx) in item.child" :key="idx">
            <p class="uname">{{itm.author_nickname}}<span>回复</span>{{itm.comUser}}</p>
            <p class="ctxt clearfix">{{itm.content}}
              <input type="button" value="回复" @click="comItem(item, itm)">
            </p>
          </li>
          <li v-show= "item.isCom">
            <p>回复 <span class="uname">{{item.isComUser}}</span></p>
            <textarea v-model="item.isComTxt"></textarea>
            <input class="fl" type="button" value="发表" @click="comment(item)">
          </li>
        </ul>
      </li>
    </ul>
  </section>
</template>
<script>
import axios from 'axios'
import {mapState} from 'vuex'
import common from './common'
// import Vue from 'vue'
export default {
  name: 'comment',
  props: ['id', 'type'],
  data () {
    return {
      commetData: []
    }
  },
  computed: {
    ...mapState([
      'userInfo'
    ])
  },
  watch: {
    '$route' (to, from) {
      if (to.name === 'articleShow') {
        this.commetData.splice(0, this.commetData.length)
        this.id = to.params.artid
        this.getData()
      }
    }
  },
  methods: {
    getData () {
      axios.post('/api/comment', {
        type: this.type,
        artId: this.id
      }).then((res) => {
        if (res.data.isOk) {
          let data = res.data.result
          this.commetData = data.filter((item) => {
            return item.pre_com_id === 0
          })
          this.commetData.forEach((item) => {
            this.$set(item, 'isCom', false)
            this.$set(item, 'isComid', 0)
            this.$set(item, 'isComUser', '')
            this.$set(item, 'comShow', false)
            this.$set(item, 'isComTxt', '')
            this.$set(item, 'comShowMsg', '查看回复')
            axios.post('/api/user', {
              userId: item.author_id
            }).then((res) => {
              if (res.data.isOk) {
                this.$set(item, 'userImg', res.data.result[0].photo)
              } else {
                this.$set(item, 'userImg', '/static/ico/default.png')
              }
            })
            item.child = data.filter((itm) => {
              return itm.pre_com_id === item.id
            })
            item.child.forEach((it) => {
              it.comUser = data.find((i) => {
                return it.com_id === i.id
              }).author_nickname
            })
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    comItem (item, itm) {
      item.isCom = true
      item.comShow = true
      if (itm) {
        item.isComid = itm.id
        item.isComUser = itm.author_nickname
      } else {
        item.isComid = item.id
        item.isComUser = item.author_nickname
      }
    },
    comment (item) {
      if (!this.userInfo.isLogin) {
        alert('请先登录')
        return
      }
      if (this.userInfo.id === item.isComid) {
        return
      }
      let comData = {
        content: item.isComTxt,
        artId: this.id,
        authorId: this.userInfo.id,
        authorName: this.userInfo.nickname,
        comId: item.isComid,
        preComId: item.id
      }
      axios.post('/api/comment', {
        type: 'insert',
        data: comData
      }).then((res) => {
        if (res.data.isOk) {
          if (res.data.result && res.data.result.insertId) {
            item.child.push({
              id: res.data.result.insertId,
              content: comData.content,
              art_id: comData.artId,
              author_id: comData.authorId,
              author_nickname: comData.authorName,
              time: new Date().toLocaleString(),
              com_id: comData.comId,
              pre_com_id: comData.preComId,
              comUser: item.isComUser
            })
            item.isComTxt = ''
          } else {
            this.getData()
          }
          item.isCom = false
        } else {
          alert('你的回复被外星人劫走了，请他日再试。')
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    gettime (time) {
      return common.getTime(time)
    },
    comShowMsg (item) {
      return item.comShow ? '收起回复' : '查看回复'
    }
  },
  created () {
    this.getData()
  }
}
</script>
