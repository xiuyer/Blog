<template>
  <header>
    <div class="top">
      <div class="container">
        <div class="left">
          <span>lolo~ 欢迎光临！</span>
          <span v-if="userInfo.isLogin">
            <span class="loginout" @click="loginout">退出登录</span>
          </span>
          <span v-else>
            <router-link to="/login"><i class="iconfont">&#xe61b;</i>登录</router-link>
            <router-link to="/register"><i class="iconfont">&#xe60f;</i>注册</router-link>
          </span>
        </div>
        <div class="right" v-show="userInfo.isLogin">
          <img src="../../static/icon/default.png" />
          <a href="#">{{userInfo.nickname}}</a>
          <!--<a href="#">消息(<span>12</span>)</a>-->
          <a href="/admin" v-show="userInfo.admin==1">后台管理</a>
        </div>
      </div>
    </div>
    <nav>
      <div class="container">
        <div class="left">
          <div class="logodiv">
            <img src="../assets/images/logo.png" />
            <ul class="logo">
              <li>L</li>
              <li>O</li>
              <li>L</li>
              <li>O</li>
              <li>W</li>
              <li>U</li>
            </ul>
          </div>
          <div class="info">
            <p>山不在高,有仙则名</p>
            <p>水不在深,有龙则灵</p>
          </div>
        </div>
        <div class="right">
          <ul>
            <li v-for="(item,index) in classData" :key="index" @click="acitve(index)" ref="aLi">
              <router-link :to="`${item.url}?para=${item.id}`">
                <span>{{item.name}}</span>
                <span>{{item.name}}</span>
              </router-link>
              <p class="footP" :class="footP[index]"></p>
              <div class="secondnav" v-if="item.child.length>0">
                  <p v-for="(itm,i) in item.child" :key="i">
                    <router-link :to="`${item.url}/${itm.id}.html?para=${item.id}`">{{itm.name}}</router-link>
                  </p>
              </div>
            </li>
            <!--<li class="music">-->
              <!--<span class="note"></span><span class="note"></span>-->
              <!--<span class="note"></span><span class="note"></span>-->
            <!--</li>-->
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>
<script>
import {mapState, mapMutations} from 'vuex'
import handleSession from './mods/handleSession'
export default {
  name: 'head',
  data () {
    return {
      footP: ['do', 're', 'mi', 'fa', 'sol', 'la', 'si'],
      lastLi: 0
    }
  },
  computed: {
    ...mapState([
      'userInfo',
      'classify'
    ]),
    classData () {
      let data = this.classify.filter((item) => {
        return item.level === 1
      })
      data.forEach((item) => {
        item.child = this.classify.filter((item2) => {
          return item2.preid === item.id
        })
      })
      data.sort((a, b) => {
        return a.idx - b.idx
      })
      return data
    }
  },
  methods: {
    loginout () {
      this.clearUser()
      handleSession.removeSession('user')
    },
    acitve (index) {
      if (index === this.lastLi) return
      this.$refs.aLi[index].classList.add('on')
      this.$refs.aLi[this.lastLi].classList.remove('on')
      this.lastLi = index
    },
    ...mapMutations([
      'updateUser',
      'clearUser'
    ])
  },
  created () {
    let uInfo = handleSession.getSession('user')
    if (uInfo) {
      this.updateUser(uInfo)
    }
  },
  mounted () {
    this.acitve(0)
  }
}
</script>
<style>
  .loginout{
    cursor: pointer;
  }
  .loginout:hover{
    text-underline: #fff;
  }
</style>
