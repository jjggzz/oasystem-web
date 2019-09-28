<template>
  <div >
    <ol class="breadcrumb">
      <li>消息</li>
      <li>未读消息</li>
    </ol>
    <msglist :list="data"></msglist>
  </div>
</template>

<script>
import msglist from './subcom/msgList' 

export default {
  data() {
    return {
      data:[
          {title:"有一位新成员想要加入",description:"你好,我是新入职的职员小王",date:"2019-09-28"},
          {title:"关于建设技术部的通知",description:"关于建设技术部的通知",date:"2019-09-28"},
          {title:"关于素质拓展的通知",description:"关于素质拓展的通知",date:"2019-09-28"},
        ]
    }
  },
  components:{
    "msglist":msglist
  }
}
</script>

<style scoped>

</style>