<template>
  <article class="content">
    <section>
      <table class="article-list">
        <thead>
          <tr>
            <th width="50%">一级分类</th>
            <th width="50%">二级分类</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in classData" :key="index">
            <td>
              <p>
                名称:<input type="text" v-model="item.name">
                序号:<input type="number" v-model="item.idx">
                <input type="button" value="修改" @click="edit(item.id,'update')">
              </p>
            </td>
            <td>
              <ul>
                <li v-for="(itm,i) in item.child" :key="i">
                  <p  class="borderB">
                    名称:<input type="text" v-model="itm.name">
                    序号:<input type="number" v-model="itm.idx">
                    <input type="button" value="修改" @click="edit(itm.id,'update')">
                    <input type="button" value="删除" @click="edit(itm.id,'delete')">
                  </p>
                </li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
    <section>
      <p>名称：<input type="text" v-model="newData.name"></p>
      <p>级别:
        <select v-model="newData.level">
          <option value="1" selected>1级</option>
          <option value="2">2级</option>
        </select>
      </p>
      <p v-show="isShow">所属一级类别:
        <select ref="preSelect" v-model="newData.preid">
          <option value="0">无</option>
          <option v-for="(item,index) in classData" :key="index" :value="item.id">{{item.name}}</option>
        </select>
      </p>
      <p>序号: <input type="number" v-model="newData.idx"></p>
      <p><input type="button" value="添加" @click="add"></p>
    </section>
  </article>
</template>
<script>
import {mapState, mapMutations, mapGetters} from 'vuex'
import axios from 'axios'
export default {
  name: 'classifyList',
  data () {
    return {
      newData: {
        name: '',
        level: 1,
        idx: 0,
        preid: 0
      }
    }
  },
  computed: {
    ...mapState([
      'classify'
    ]),
    ...mapGetters([
      'getClassify'
    ]),
    classData () {
      let data = []
      data = this.classify.filter((item) => {
        return item.level === 1
      })
      data.forEach((item) => {
        item.child = this.classify.filter((item2) => {
          return item2.preid === item.id
        })
      })
      return data
    },
    isShow () {
      return this.newData.level === '2'
    }
  },
  methods: {
    ...mapMutations([
      'setClassify',
      'getClassify'
    ]),
    edit (id, type) {
      axios.post('/api/classify', {
        type,
        id,
        data: this.getClassify(id)
      }).then((res) => {
        if (res.data.isOk) {
          alert('修改成功')
          this.setClassify()
        } else {
          alert('修改失败')
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    add () {
      axios.post('/api/classify', {
        type: 'insert',
        data: this.newData
      }).then((res) => {
        if (res.data.isOk) {
          alert('添加成功')
          this.setClassify()
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
