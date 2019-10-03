import Vue from 'vue'
import Router from 'vue-router'
import loginAndRegister from './components/login_and_register/loginAndRegister'
import login from './components/login_and_register/login'
import register from './components/login_and_register/register'
import home from './components/home/home'
import message from './components/home/main/message/message'
import user from './components/home/main/user/user'
import dep from './components/home/main/dep/dep'
import org from './components/home/main/org/org'
import chat from './components/home/main/chat/chat'
import file from './components/home/main/file/file'
import apply from './components/home/main/apply/apply'
import notice from './components/home/main/notice/notice'
import unreadmessages from './components/home/main/message/unreadmessages'
import historymessages from './components/home/main/message/historymessages'
import userinfo from './components/home/main/user/userinfo'
import depinfo from './components/home/main/dep/depinfo'
import depmember from './components/home/main/dep/depmember'
import orginfo from './components/home/main/org/orginfo'
import deplist from './components/home/main/org/deplist'
import orgmember from './components/home/main/org/orgmember'

Vue.use(Router)

export default new Router({
  routes: [
    { 
      path: '/',
      redirect:'/loginAndRegister/login'
    },
    {
      path: '/loginAndRegister',
      name:'loginAndRegister',
      component: loginAndRegister,
      children:[
        {path:'login',component:login},
        {path:'register',component:register}
      ]
    },
    {
      path: '/home',
      component:home,
      children:[
        {path:'message',component:message,
          children:[
            {path:'unreadmessages',component:unreadmessages},
            {path:'historymessages',component:historymessages}
          ]
        },
        {path:'user',component:user,
          children:[
            {path:'userinfo',component:userinfo}
          ]
        },
        {path:'dep',component:dep,
          children:[
            {path:'depinfo',component:depinfo},
            {path:'depmember',component:depmember},
          ]
        },
        {path:'org',component:org,
          children:[
            {path:'orginfo',component:orginfo},
            {path:'deplist',component:deplist},
            {path:'orgmember',component:orgmember}
          ]
        },
        {path:'chat',component:chat},
        {path:'file',component:file},
        {path:'apply',component:apply},
        {path:'notice',component:notice}
      ]
    }
  ],
  linkActiveClass: 'active'
})
