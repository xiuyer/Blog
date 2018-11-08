// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import admin from './admin.vue'
import router from '../router/adminRouter'
import store from '../vuex/index'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#admin',
  router,
  store,
  render: (h) => {
    return h(admin)
  }
})
