import Vue from 'vue'
import Router from 'vue-router'
import artticle from '@/components/admin/article'
import classifyList from '@/components/admin/classifyList'
import userManager from '@/components/admin/userManager'
import label from '@/components/admin/label'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'article',
      component: artticle
    },
    {
      path: '/classifylist',
      name: 'classifyList',
      component: classifyList
    },
    {
      path: '/userManager',
      name: 'userManager',
      component: userManager
    },
    {
      path: '/label',
      name: 'label',
      component: label
    }
  ]
})
