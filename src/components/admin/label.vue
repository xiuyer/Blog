<template>
  <article class="content">
    <h1>标签管理</h1>
    <section>
      <table class="article-list" width="400">
        <thead>
        <tr>
          <th width="40%">名字</th>
          <th width="60%">编辑</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in labels" :key="index">
          <td><input type="text" v-model="item.name"></td>
          <td><input type="button" value="确定" @click="edit(item.id,'update')">
            <input type="button" value="删除" @click="edit(item.id,'delete')"></td>
        </tr>
        <tr>
          <td><input type="text" v-model="newTxt"></td>
          <td><input type="button" value="添加" @click="add()"></td>
        </tr>
        </tbody>
      </table>
    </section>
    <div><input type="button" value="更新" @click="setLabels"></div>
  </article>
</template>
<script>
import {mapState, mapMutations} from 'vuex'
import axios from 'axios'
export default {
  name: 'label',
  data () {
    return {
      newTxt: ''
    }
  },
  computed: {
    ...mapState([
      'labels'
    ])
  },
  methods: {
    ...mapMutations([
      'setLabels',
      'getLabels'
    ]),
    edit (id, type) {
      axios.post('/api/label', {
        type,
        id,
        data: this.getLabels(id)
      }).then((res) => {
        if (res.data.isOk) {
          alert('修改成功')
        } else {
          alert('修改失败')
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    add () {
      axios.post('/api/labels', {
        type: 'insert',
        name: this.newTxt
      }).then((res) => {
        if (res.data.isOk) {
          alert('添加成功')
        } else {
          alert('添加失败')
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>
