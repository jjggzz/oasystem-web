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
import historynotice from './components/home/main/notice/historynotice'
import sendnotice from './components/home/main/notice/sendnotice'
import createapply from './components/home/main/apply/createapply'
import historyapply from './components/home/main/apply/historyapply'
import underwayapply from './components/home/main/apply/underwayapply'
import updatepassword from './components/home/main/user/updatepassword'
import createdep from './components/home/main/org/manage/createdep'
import depmanage from './components/home/main/org/manage/depmanage'
import membermanage from './components/home/main/org/manage/membermanage'
import positionmanage from './components/home/main/org/manage/positionmanage'

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
            {path:'userinfo',component:userinfo},
            {path:'updatepassword',component:updatepassword}
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
            {path:'orgmember',component:orgmember},
            {path:'createdep',component:createdep},
            {path:'depmanage',component:depmanage},
            {path:'membermanage',component:membermanage},
            {path:'positionmanage',component:positionmanage}
          ]
        },
        {path:'chat',component:chat},
        {path:'file',component:file},
        {path:'apply',component:apply,
          children:[
            {path:'createapply',component:createapply},
            {path:'historyapply',component:historyapply},
            {path:'underwayapply',component:underwayapply}
          ]
        },
        {path:'notice',component:notice,
          children:[
            {path:'historynotice',component:historynotice},
            {path:'sendnotice',component:sendnotice}
          ]
        }
      ]
    }
  ],
  linkActiveClass: 'active'
})
