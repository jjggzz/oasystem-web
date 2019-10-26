import Vue from 'vue'
import Router from 'vue-router'
import login from './components/login'
import register from './components/register'
import home from './components/home'

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
      component:home
    }
  ]
})
