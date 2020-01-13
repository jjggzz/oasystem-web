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
import articleInfoManage from '../components/adminpage/article/articleInfoManage'

import chat from '../components/userpage/chat/chat'
import notice from '../components/userpage/notice/notice'
import memberList from '../components/userpage/member/memberList'
import noticeFile from '../components/userpage/file/noticeFile'
import myFile from '../components/userpage/file/myFile'
import technology from '../components/userpage/article/technology'
import waffle from '../components/userpage/article/waffle'
import sendArticle from '../components/userpage/article/sendArticle'
import myArticle from '../components/userpage/article/myArticle'
import articleInfo from '../components/userpage/article/articleInfo'

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
        },
        {
          path:'articleInfoManage',
          component:articleInfoManage
        },
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
          path:'notice',
          component:notice
        },
        {
          path:'memberList',
          component:memberList
        },
        {
          path:'noticeFile',
          component:noticeFile
        },
        {
          path:'myFile',
          component:myFile
        },
        {
          path:'technology',
          component:technology
        },
        {
          path:'waffle',
          component:waffle
        },
        {
          path:'sendArticle',
          component:sendArticle
        },
        {
          path:'myArticle',
          component:myArticle
        },
        {
          path:'articleInfo',
          component:articleInfo
        },
      ]
    }
  ]
})
