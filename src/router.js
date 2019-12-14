import Vue from 'vue'
import Router from 'vue-router'
import login from './components/login'
import adminHome from './components/adminHome'
import userHome from './components/userHome'
import userManage from './components/adminpage/userManage'
import adminExclusive from './components/adminpage/adminExclusive'

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
    },
    {
      path: '/adminHome',
      redirect:'/adminHome/adminExclusive',
      component:adminHome,
      children:[
        {
          path:'userManage',
          component:userManage
        },
        {
          path:'adminExclusive',
          component:adminExclusive
        }
      ]
    },
    {
      path: '/userHome',
      component:userHome
    }
  ]
})
