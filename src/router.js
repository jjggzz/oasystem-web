import Vue from 'vue'
import Router from 'vue-router'
import loginAndRegister from './components/login_and_register/loginAndRegister'
import login from './components/login_and_register/login'
import register from './components/login_and_register/register'
import home from './components/home/home'

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
      component:home
    }
  ],
  linkActiveClass: 'active'
})
