<template>
  <div>
    <ol class="breadcrumb">
      <li>消息</li>
      <li>历史消息</li>
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
          {title:"技术讲座",description:"开展技术讲座",date:"2019-09-28"},
          {title:"关于建设技术部的通知",description:"关于建设技术部的通知",date:"2019-09-28"},
        ]
    }
  },
  components:{
    "msglist":msglist
  }
}
</script>

<style>

</style>