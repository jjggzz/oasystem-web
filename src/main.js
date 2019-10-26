import Vue from 'vue'
import App from './App.vue'
import router from './router'
//导入elementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 导入bootstrap
import 'bootstrap'
import "bootstrap/dist/css/bootstrap.css"
import './css/mystyle.css'

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
