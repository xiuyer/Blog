<template>
  <article class="content">
    <section>
      <table class="article-edit">
        <tr>
          <td>标题</td>
          <td><input type="text" ref="title" v-model="itemData.title"></td>
        </tr>
        <tr>
          <td>类别</td>
          <td>
            <classify ref="classSelect" :firstId="itemData.classify_first_id"
                      :secondId="itemData.classify_second_id"></classify>
          </td>
        </tr>
        <tr>
          <td>标签</td>
          <td>
            <select v-model="itemData.label_id">
              <option v-for="(item,index) in labels" :value="item.id" :key="index">{{item.name}}</option>
            </select>
          </td>
        </tr>
        <tr>
          <td>图片</td>
          <td>
            选择已有:
            <select name="imgsl" ref="imgsl" v-model="itemData.imgurl">
              <option v-for="(item,index) in imgArr" :value="item" :key="index">{{index}}</option>
            </select>
            <img :src="itemData.imgurl" alt="" width="50" height="30">
          </td>
        </tr>
        <tr>
          <td>内容</td>
          <td height="auto">
            <editor :defaultContent=itemData.content :config=config ref="ue"></editor>
          </td>
        </tr>
        <tr>
          <td>演示地址</td>
          <td><input type="text" v-model="itemData.url"></td>
        </tr>
        <tr>
          <td>状态</td>
          <td>
            <select v-model="itemData.status_id">
              <option v-for="(item,index) in status" :value="item.id" :key="index">{{item.name}}</option>
            </select>
          </td>
        </tr>
        <tr>
          <td></td>
          <td>
            <input type="button" value="保存" @click="submit"/>
            <div>{{resultMsg}}</div>
          </td>
        </tr>
      </table>
    </section>
  </article>
</template>
<script>
import editor from '../mods/editor'
import classify from '../mods/classify'
import axios from 'axios'
import {mapState} from 'vuex'
import fs from 'fs'
export default {
  props: ['itemData'],
  data() {
    return {
      resultMsg: '',
      imgArr: [],
      config: {
        initialFrameWidth: 850,
        initialFrameHeight: 550
      }
    }
  },
  computed: {
    ...mapState([
      'userInfo',
      'labels',
      'status'
    ])
  },
  methods:{
    submit () {
      this.itemData.content = this.$refs.ue.getUEContent()
      this.itemData.contentTxt = this.$refs.ue.getUEContentTxt().slice(0,200)
      let cl = this.$refs.classSelect
      this.itemData.classify_first_id = cl.firstSelect
      this.itemData.classify_second_id = cl.secondSelect
      let type
      if(this.itemData.id){
        type = 'update'
      }else{
        type = 'insert'
      }
      axios.post('/api/articleEdit',{
        type,
        data: this.itemData
      }).then((res)=>{
        if(res.data.isOk){
          this.resultMsg = '保存成功'
          this.$emit('editevent')
        }else{
          this.resultMsg = '保存失败'
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  },
  components: {
    editor,
    classify,
  },
  created() {
    if(!this.itemData){
      this.itemData = {
          id: 0,
          classify_first_id: 1,
          classify_second_id: 0,
          title: '',
          label_id: 1,
          imgurl: '/image/articleLogo/1.jpg',
          content: '',
          contentTxt: '',
          author_id: 0,
          author_nkname: '',
          regtime: '',
          updatetime: '',
          readcount: 0,
          favorite: 0,
          url: '',
          status_id: 1,
        }
    }
    axios.get('/api/file/articleImg').then((res)=>{
      if(res.data.isOk){
        this.imgArr = res.data.result.map((item)=>{
          return '/image/articleLogo/' + item
        })
      }
    }).catch((err)=>{
      console.log(err)
    })
    this.itemData.author_id = this.userInfo.id
    this.itemData.author_nkname = this.userInfo.nickname
  }
}
</script>
