import Vue from 'vue'
import Router from 'vue-router'
import login from '../components/login'
import adminHome from '../components/adminpage/adminHome'
import userHome from '../components/userpage/userHome'
import userManage from '../components/adminpage/user/userManage'
import departmentManage from '../components/adminpage/department/departmentManage'
import positionManage from '../components/adminpage/position/positionManage'
import flowManage from '../components/adminpage/flow/flowManage'
import addFlow from '../components/adminpage/flow/addFlow'
import articleManage from '../components/adminpage/article/articleManage'

import chat from '../components/userpage/chat/chat'
import sendNotice from '../components/userpage/notice/sendNotice'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { 
      path: '/',
      redirect:'/login'
    },
    {   
      path:'/login',
      component:login
    },
    {
      path: '/adminHome',
      redirect:'/adminHome/userManage',
      component:adminHome,
      children:[
        {
          path:'userManage',
          component:userManage
        },
        {
          path:'departmentManage',
          component:departmentManage
        },
        {
          path:'positionManage',
          component:positionManage
        },
        {
          path:'flowManage',
          component:flowManage
        },
        {
          path:'addFlow',
          component:addFlow,
        },
        {
          path:'articleManage',
          component:articleManage,
        }
      ]
    },
    {
      path: '/userHome',
      redirect:'/userHome/chat',
      component:userHome,
      children:[
        {
          path:'chat',
          component:chat
        },
        {
          path:'sendNotice',
          component:sendNotice
        },
      ]
    }
  ]
})
