<template>
  <div class="userinfo-container">
    <div style="width:100%;">
    <ol class="breadcrumb">
        <li>用户</li>
        <li>用户信息</li>
    </ol>
    </div>
    
    <userinfo :data="user" :isme="true"></userinfo>
    
  </div>
</template>

<script>
import userinfo from '../../../subcom/userinfo'

export default {
  data() {
    return {
      user:{
          userName:"张三",
          userLoginName:"1945282561",
          userEmail:"1945282561@qq.com",
          userPhone:"18376301879",
          userEntityTime:"2019-09-28",
          org:{orgName:"南宁学院"},
          dep:{depName:"信息工程学院"},
          pos:{posName:"副部长"}
        }
    }
  },
    components:{
      'userinfo':userinfo
    }
}
</script>

<style>
  .userinfo-container{
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      border-radius: 5px;
      background-color: #fff;
    }


</style>