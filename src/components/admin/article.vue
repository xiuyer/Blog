<template>
  <div class="initDiv">
    <article class="content" v-if="listShow">
      <header>
        <p>
          <input type="text" placeholder="输入文章标题">
          <input type="button" value="搜索">
        </p>
      </header>
      <section class="line clearfix">
        <div class="left">
          <input type="button" value="- 批量删除">
          <input type="button" value="+ 新建文章" @click="edit(null)">
        </div>
        <div class="right">
          共有数据: <span>{{articleData.length}}</span>条
        </div>
      </section>
      <section>
        <table class="article-list">
          <thead>
          <tr>
            <th width="5%">选择</th>
            <th width="35%">标题</th>
            <th width="15%">类别</th>
            <th width="10%">标签</th>
            <th width="10%">作者</th>
            <th width="10%">状态</th>
            <th width="15%">编辑</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) in articleData" :key="index">
            <td><input type="checkbox" value="item.id"/></td>
            <td v-html="item.title"></td>
            <td v-html="`${getClassify(item.classify_first_id).name}》${getClassify(item.classify_second_id).name}`"></td>
            <td v-html="getLabels(item.label_id).name"></td>
            <td v-html="item.author_nkname"></td>
            <td v-html="getStatus(item.status_id).name"></td>
            <td>
              <input type="button" value="编辑" @click="edit(item)" >
              <input type="button" value="删除" @click="delItem(item.id)">
            </td>
          </tr>
          </tbody>
        </table>
      </section>
    </article>
    <articleEdit v-else :itemData="itemData"  @editevent="editok"></articleEdit>
  </div>
</template>
<script>
import axios from 'axios'
import {mapGetters} from 'vuex'
import articleEdit from './articleEdit'
export default {
  name: 'article',
  data () {
    return {
      articleData: [],
      listShow: true,
      itemData: {}
    }
  },
  components: {
    articleEdit
  },
  computed: {
    ...mapGetters([
      'getClassify',
      'getStatus',
      'getLabels'
    ])
  },
  methods: {
    delItem (id) {
      axios.post('/api/articleEdit', {
        type: 'delete',
        data: {id}
      }).then((res) => {
        if (res.data.isOk) {
          alert('删除成功')
        } else {
          alert('删除失败')
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    edit (item) {
      this.itemData = item
      this.listShow = false
    },
    editok () {
      this.listShow = true
    }
  },
  created () {
    axios.get('/api/article', {
      params: {type: 'all'}
    })
      .then((res) => {
        if (res.data.isOk) {
          this.articleData = res.data.result
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
</script>
