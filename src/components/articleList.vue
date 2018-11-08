<template>
  <section class="content container mt110">
    <listCom :type="type" :para="para" :cid="cid" ref="listCom"></listCom>
    <column></column>
  </section>
</template>
<script>
import listCom from './mods/listComponent'
import column from './mods/column'
export default {
  name: 'articleList',
  data () {
    return {
      type: this.$route.params.type,
      cid: this.$route.params.cid,
      para: this.$route.query.para
    }
  },
  components: {
    listCom,
    column
  }
}
</script>
