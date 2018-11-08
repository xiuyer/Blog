<template>
  <div class="classify-wrapper">
    <select name="first" id="first" v-model="firstSelect">
      <option v-for="(item,index) in data" :value="item.id" :key="index">{{item.name}}</option>
    </select>
    <select name="second" id="second" v-model="secondSelect">
      <option v-for="(item,index) in secondData" :value="item.id" :key="index">{{item.name}}</option>
    </select>
  </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
  name: 'classify',
  props: ['firstId', 'secondId'],
  data () {
    return {
      firstSelect: this.firstId,
      secondSelect: this.secondId
    }
  },
  computed: {
    ...mapState([
      'classify'
    ]),
    data () {
      return this.classify.filter((item) => {
        return item.level === 1
      })
    },
    secondData () {
      return this.classify.filter((item) => {
        return item.preid === this.firstSelect
      })
    }
  }
}
</script>
