<template>
  <div class="main">
    <div class="work-wrapper clearfix" v-if="type == 'works'">
      <article v-for="(item,index) in listData" :key="index">
        <p class="label">{{getLabels(item.label_id).name}}</p>
        <router-link :to="`/article_${item.id}.html`">
          <div class="imgA"  @mouseenter="mouseEnter($event)" @mouseleave="mouseLeave($event)">
            <img :src="item.imgurl"/>
            <img :src="item.imgurl"/>
            <img :src="item.imgurl"/>
            <img :src="item.imgurl"/>
            <img :src="item.imgurl"/>
          </div>
        </router-link>
        <router-link :to="`/article_${item.id}.html`" class="title">{{item.title}}</router-link>
        <a :href="item.url" class="url" target="_blank">作品地址</a>
      </article>
    </div>
    <div v-else>
      <article v-for="(item, index) in listData" :key="index" ref="bolo">
        <h1>
          <span>{{getLabels(item.label_id).name}}</span>
          <router-link :to="`/article_${item.id}.html`">{{item.title}}</router-link>
        </h1>
        <section class="clearfix">
          <img :src="item.imgurl" alt="">
          <div class="info">
            <p>{{item.contentTxt.slice(0,130)}}...</p>
            <ul>
              <li>
                <i class="iconfont">&#xe663;</i>
                <span>{{item.author_nkname}}</span>
                <!--<router-link :to="`/user_${item.author_id}.html`">{{item.author_nkname}}</router-link>-->
              </li>
              <li><i class="iconfont">&#xe657;</i><span>{{getTime(item.regtime)}}</span>前</li>
              <li><i class="iconfont">&#xe61a;</i><span>{{item.readcount}}</span>浏览</li>
              <li><i class="iconfont">&#xe634;</i><span>{{getComCount(item.id)||0}}评论</span></li>
              <li><i class="iconfont">&#xe64a;</i><span>{{item.favorite||0}}喜欢</span></li>
            </ul>
          </div>
        </section>
      </article>
    </div>
    <div class="wait" v-show="waitShow">
      <p>加载中</p>
      <div>
        <span class="ico"></span>
        <span class="ico"></span>
        <span class="ico"></span>
        <span class="ico"></span>
        <span class="ico"></span>
      </div>
    </div>
    <div class="msg" v-show="msgShow">没有更多数据了</div>
    <div ref="wait"></div>
  </div>
</template>
<script>
import axios from 'axios'
import {mapGetters} from 'vuex'
export default {
  name: 'listComponent',
  props: ['type', 'para', 'cid'],
  data () {
    return {
      listData: [],
      msgShow: false,
      waitShow: true,
      start: 0,
      count: 10,
      isDone: false,
      trans: ['turnLeft', 'turnRight', 'turnTop', 'turnDown'],
      arrA: [],
      timer: 0,
      isGetData: true
    }
  },
  computed: {
    ...mapGetters([
      'getLabels'
    ])
  },
  watch: {
    '$route' (to, from) {
      this.isDone = false
      this.msgShow = false
      this.waitShow = true
      this.isGetData = true
      this.start = 0
      this.listData.length = 0
      if (to.name === 'articlelist' || to.name === 'index') {
        this.type = to.params.type || 'all'
        this.cid = to.params.cid
        this.para = to.query.para
        this.getData()
      }
    }
  },
  methods: {
    getData () {
      if (this.isDone) {
        this.msgShow = true
        this.waitShow = false
        return
      }
      axios.get('api/article', {
        params: {
          type: this.type,
          para: this.para,
          cid: this.cid,
          start: this.start,
          count: this.count
        }
      }).then((res) => {
        if (res.data.isOk) {
          this.listData = this.listData.concat(res.data.result)
          if (res.data.result.length < this.count) {
            this.isDone = true
            this.msgShow = true
          }
        } else {
          this.msgShow = true
          this.isDone = true
        }
        this.isGetData = false
        this.waitShow = false
      }).catch((err) => {
        console.log(err)
      })
      this.start += this.count
    },
    getTime (time) {
      let newtime = new Date()
      time = new Date(time)
      let disTime = newtime - time
      let ss = disTime / 1000
      let mm = ss / 60
      let hh = mm / 60
      let day = hh / 24
      if (day >= 1) {
        return parseInt(day) + '天'
      } else if (hh >= 1) {
        return parseInt(hh) + '小时'
      } else if (mm >= 1) {
        return parseInt(mm) + '分钟'
      } else {
        return parseInt(ss) + '秒'
      }
    },
    getComCount (id) {
      axios.post('/api/comment', {
        type: 'count',
        id
      }).then((res) => {
        if (res.data.isOk) {
          return res.data.result
        } else {
          return 0
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    mouseEnter (ev) {
      let [x, y] = [ev.offsetX, ev.offsetY]
      let [w, h] = [ev.target.clientWidth, ev.target.clientHeight]
      let dis = {
        Top: y,
        Down: h - y,
        Left: x,
        Right: w - x
      }
      let min = 0
      let temp = ''
      for (let [key, value] of Object.entries(dis)) {
        if (!min || min > value) {
          min = value
          temp = key
          continue
        }
      }
      ev.target.classList.add('turn' + temp)
      ev.target.temp = temp
    },
    mouseLeave (ev) {
      ev.target.classList.remove('turn' + ev.target.temp)
    }
  },
  created () {
    this.getData()
  },
  mounted () {
    let _this = this
    window.onscroll = function () {
      if (_this.isDone || _this.isGetData) return
      clearTimeout(_this.timer)
      let cNode = _this.$refs.wait
      let pNode = cNode.parentNode
      let testTop = cNode.offsetTop
      while (pNode !== document && pNode) {
        testTop += pNode.offsetTop
        pNode = pNode.parentNode
      }
      let currentBottom = (document.documentElement.scrollTop || document.body.scrollTop) + window.innerHeight
      if (testTop - currentBottom < 160) {
        _this.waitShow = true
        _this.isGetData = true
        _this.timer = setTimeout(_this.getData.bind(_this), 1000)
      }
    }
  }
}
</script>
