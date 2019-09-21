<template>
  <div class="text-center">
    <div class="btn-group btn-group-justified">
       <div class="form-group">
            <label for="userName">用户名</label>
            <input type="email" class="form-control" id="userName" placeholder="请输入用户名">
        </div>
        <div class="form-group">
            <label for="userLoginName">登陆名</label>
            <input type="email" class="form-control" id="userLoginName" placeholder="请输入登陆名">
        </div>
        <div class="form-group">
            <label for="userPassword">密码</label>
            <input type="password" class="form-control" id="userPassword" placeholder="请输入密码">
        </div>
        <div class="form-group">
            <label for="rePassword">确认密码</label>
            <input type="password" class="form-control" id="rePassword" placeholder="确认密码">
        </div>
         <div class="form-group">
            <label for="userEmail">邮箱</label>
            <input type="password" class="form-control" id="userEmail" placeholder="请输入邮箱">
        </div>
         <div class="form-group">
            <label for="userPhone">电话号码</label>
            <input type="password" class="form-control" id="userPhone" placeholder="请输入电话号码">
        </div>
    </div>
    <button type="button" class="btn btn-success">
        <span class="glyphicon glyphicon-tags"></span> 
        注册
    </button>
</div>
</template>

<script>
export default {

}
</script>

<style>

</style>