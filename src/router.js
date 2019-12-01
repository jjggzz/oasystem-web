import Vue from 'vue'
import Router from 'vue-router'
import login from './components/login'
import adminHome from './components/adminHome'
import userHome from './components/userHome'


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
      component:adminHome
    },
    {
      path: '/userHome',
      component:userHome
    }
  ]
})
