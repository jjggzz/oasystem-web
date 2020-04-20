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
axios.defaults.baseURL= 'http://192.168.1.102/oasystem'
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

import global from './js/ws.js'
Vue.prototype.global = global

new Vue({
  store,
  router,
  created() {
    //从缓存中获取用户信息
    var userInfo =  JSON.parse(sessionStorage.getItem('userInfo'))
    //如果存在
    if(userInfo!=null){
      //初始化ws
      this.init(userInfo.userId,userInfo.userDepartmentId)
      sessionStorage.setItem('flag',JSON.stringify(true))
    }  
  },
  destroyed() {
    //销毁ws
    this.global.ws.onclose = function () {
      console.log("socket已经关闭")
    }
  },
  methods: {
    init(userId,depId){
      //初始化ws
      this.global.setWs(userId,depId)
      var that = this
      //消息接收方式
      this.global.ws.onmessage = function(msg){
        var message = JSON.parse(msg.data)
        if(message.type == 0){
          that.$store.commit("updateMessageList",message)
        }
        if(message.type == 1){
            const h = that.$createElement;
            that.$notify({
              title: '发送人：'+message.userName,
              message: h('i', { style: 'color: teal'}, message.content)
          });
        }
    }
    }
  },
  render: h => h(App)
}).$mount('#app')
