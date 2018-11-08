<template>
<div id="admin">
  <header class="header">
    <a href="/">首页</a>
    <span>退出登录</span>
  </header>
  <section class="content-wrapper">
    <aside>
      <ul>
        <li>
          <router-link to="/">文章管理</router-link>
        </li>
        <li>
          <router-link to="/userManager">用户管理</router-link>
        </li>
        <li>
          <router-link to="/classifylist">类别管理</router-link>
        </li>
        <li>
          <router-link to="/label">标签管理</router-link>
        </li>
      </ul>
    </aside>
    <router-view></router-view>
  </section>
</div>
</template>
<script>
import {mapState, mapMutations} from 'vuex'
import handleSession from '../components/mods/handleSession'
import common from '../components/mods/common'
export default {
  name: 'admin',
  methods: {
    ...mapMutations([
      'setClassify',
      'setStatus',
      'setLabels',
      'updateUser'
    ])
  },
  computed: {
    ...mapState([
      'classify',
      'status',
      'labels'
    ])
  },
  created () {
    this.setClassify()
    this.setStatus()
    this.setLabels()
    let userInfo = handleSession.getSession('user')
    if (userInfo) {
      if (userInfo.admin === 1) {
        this.updateUser(userInfo)
      } else {
        alert('只有管理员可以进入后台')
        common.turn('/', 100)
      }
    } else {
      alert('请登录')
      common.turn('/#login', 100)
    }
  }
}
</script>
