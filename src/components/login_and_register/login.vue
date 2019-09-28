<template>
  <div class="text-center">
      <div class="btn-group btn-group-justified">
          <div class="form-group">
              <label for="userLoginName">登陆名</label>
              <input v-model="user.userLoginName" type="text" class="form-control" id="userLoginName" placeholder="请输入登陆名">
          </div>
          <div class="form-group">
              <label for="userPassword">密码</label>
              <input v-model="user.userPassword" type="password" class="form-control" id="userPassword" placeholder="请输入密码">
          </div>
      </div>
      <button @click="login" type="button" class="btn btn-success">
          <span class="glyphicon glyphicon-send"></span> 
          登陆
      </button>
  </div>
</template>

<script>
export default {
    data() {
        return {
            user:{userLoginName:'',userPassword:''}
        }
    },
    methods: {
        login(){
            alert(this.user.userLoginName+"......"+this.user.userPassword);
            this.$router.push({path:'/home/chat'})
        }
    },
}
</script>

<style>

</style>