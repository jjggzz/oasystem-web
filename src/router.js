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
        {path:'message',component:message},
        {path:'user',component:user},
        {path:'dep',component:dep},
        {path:'org',component:org},
        {path:'chat',component:chat},
        {path:'file',component:file},
        {path:'apply',component:apply},
        {path:'notice',component:notice}
      ]
    }
  ],
  linkActiveClass: 'active'
})
