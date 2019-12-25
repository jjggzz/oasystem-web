import Vue from 'vue'
import App from './App.vue'
//router
import router from './js/router.js'
//导入elementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
//axios
import axios from 'axios'
import VueAxios from 'vue-axios'
//设置全局访问路径
axios.defaults.baseURL= 'http://localhost:8081/oasystem'
//访问携带cookie
axios.defaults.withCredentials = true
Vue.use(VueAxios, axios)

//自己的css
import './css/mystyle.css'
import './css/icon/iconfont.css'
//vuex
import store from './js/store.js'




//全局日期过滤器
Vue.filter('dateFormart',function(date,formart ='yyyy-MM-dd HH:mm:ss'){
  var dt = new Date(date);
  var y  = dt.getFullYear();
  var m = dt.getMonth()+1;
  var d = dt.getDate();
  if(formart === 'yyyy-MM-dd' ){
    return `${y}-${m<10?'0'+m:m}-${d<10?'0'+d:d}`;
  }
  else if(formart === 'yyyy-MM-dd HH:mm:ss'){
    var HH = dt.getHours();
    var mm = dt.getMinutes();
    var ss = dt.getSeconds();
    return `${y}-${m<10?'0'+m:m}-${d<10?'0'+d:d} ${HH<10?'0'+HH:HH}:${mm<10?'0'+mm:mm}:${ss<10?'0'+ss:ss}`;
  }
  else{
    return date
  }


})

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
