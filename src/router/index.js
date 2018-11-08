import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/user/login'
import index from '@/components/index'
import register from '@/components/user/register'
import articleList from '@/components/articleList'
import articleShow from '@/components/articleShow'
import guestbook from '@/components/guestbook'
import about from '@/components/about'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/articlelist/:type/:cid.html',
      name: 'articlelist',
      component: articleList
    },
    {
      path: '/articlelist/:type',
      name: 'articlelist',
      component: articleList
    },
    {
      path: '/article_:artid.html',
      name: 'articleShow',
      component: articleShow
    },
    {
      path: '/guestbook',
      name: 'guestbook',
      component: guestbook
    },
    {
      path: '/about',
      name: 'about',
      component: about
    }
  ],
  scrollBehavior () {
    return {
      x: 0,
      y: 0
    }
  }
})
