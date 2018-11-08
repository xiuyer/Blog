<template>
  <article class="content">
    <h1>用户管理</h1>
    <section>
      <table class="article-list">
        <thead>
        <tr>
          <th>选择</th>
          <th>用户名</th>
          <th>昵称</th>
          <th>性别</th>
          <th>注册时间</th>
          <th>活跃度</th>
          <th>操做</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,index) in userData" :key="index">
          <td><input type="checkbox" :value="item.id"></td>
          <td>{{item.username}}</td>
          <td>{{item.nickname}}</td>
          <td>{{item.sex == 1?'女':'男'}}</td>
          <td>{{item.regtime}}</td>
          <td>{{item.activeness}}</td>
          <td><input type="button" value="删除" @click="delete(item.id)"></td>
        </tr>
        </tbody>
      </table>
    </section>
  </article>
</template>
<script>
import axios from 'axios'
export default {
  name: 'userManager',
  data () {
    return {
      userData: []
    }
  },
  methods: {
    delete (id) {
      axios.post('/api/userData', {
        type: 'delete',
        id
      }).then((res) => {
        if (res.data.isOk) {
          alert('删除成功')
        } else {
          alert('删除失败')
        }
      })
    }
  },
  created () {
    axios.get('/api/userData').then((res) => {
      if (res.data.isOk) {
        this.userData = res.data.result
      }
    })
  }
}
</script>
