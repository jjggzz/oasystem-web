import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 导入bootstrap
import 'bootstrap'
import "bootstrap/dist/css/bootstrap.css"


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
