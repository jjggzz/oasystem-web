import Vue from 'vue'
import Router from 'vue-router'
import login from './components/login'
import register from './components/register'
import home from './components/home'

import depChat from './components/fun/chat/depChat'
import orgChat from './components/fun/chat/orgChat'

import fileList from './components/fun/file/fileList'

import sendNotice from './components/fun/notice/sendNotice'
import historyNotice from './components/fun/notice/historyNotice'

import newMessage from './components/fun/message/newMessage'
import historyMessage from './components/fun/message/historyMessage'

import depList from './components/fun/structure/depList'
import employList from './components/fun/structure/employList'

Vue.use(Router)

export default new Router({
  routes: [
    { 
      path: '/',
      redirect:'/login'
    },
    {
      path:'/login',
      component:login
    },{
      path:'/register',
      component:register
    },
    {
      path: '/home',
      component:home,
      children:[
        {path:'depChat',component:depChat},
        {path:'orgChat',component:orgChat},
        {path:'fileList',component:fileList},
        {path:'sendNotice',component:sendNotice},
        {path:'historyNotice',component:historyNotice},
        {path:'newMessage',component:newMessage},
        {path:'historyMessage',component:historyMessage},
        {path:'depList',component:depList},
        {path:'employList',component:employList}
      ]
    }
  ]
})
