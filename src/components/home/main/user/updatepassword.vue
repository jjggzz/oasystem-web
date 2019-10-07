<template>
  <div class="updatepassword-container">
      <div style="width:100%;">
        <ol class="breadcrumb">
            <li>用户</li>
            <li>修改密码</li>
        </ol>
      </div>
      <ol>
          <li>请选择接收验证码的方式(通过短信接收或通过邮箱接收)</li>
          <li>
              验证码会发送到用户账号绑定的<strong>手机号码</strong>或<strong>电子邮箱</strong>中,请保证其真实有效
          </li>
      </ol>

      <div class="updatepassword">
          <div class="func text-center">
                <button type="button" class="btn btn-info btn-block" @click="updatestyle">切换验证码接收方式</button>
          </div>
          <form class="form-horizontal">
              <h3 v-show="style" class="text-center">通过手机号码</h3>
              <h3 v-show="!style" class="text-center">通过电子邮件</h3>
               <div class="form-group">
                    <label for="check" class="col-sm-2 control-label">验证码</label>
                    <div class="col-sm-8">
                        <div class="input-group">
                            <input type="text" class="form-control" id="check" placeholder="请输入验证码">
                            <div class="input-group-addon">
                                <span v-if="time==0" @click="getcheck">获取验证码</span> 
                                <span v-else>{{time}}秒后才能获取</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label for="password" class="col-sm-2 control-label">新密码</label>
                    <div class="col-sm-8">
                        <input type="password" class="form-control" id="password" placeholder="请输入新密码">
                    </div>
                </div>
                <div class="form-group">
                    <label for="repassword" class="col-sm-2 control-label">确认密码</label>
                    <div class="col-sm-8">
                        <input type="password" class="form-control" id="repassword" placeholder="两次密码必须一致">
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-sm-offset-2 col-sm-10">
                    <button class="btn btn-success" >修改</button>
                    </div>
                </div>
          </form>
      </div>

  </div>
</template>

<script>
export default {
    data() {
        return {
            style:true,
            time:0,
        }
    },
    methods: {
        //修改密码的方式
        updatestyle(){
            this.style = !this.style;
        },
        getcheck(){
            if(this.time != 0){
                return 
            }
            if(this.style){
                //调用服务端,发送短信验证码
            }
            else{
                //调用服务端,发送邮件验证码
            }
            this.time = 60; 
            var trimer = setInterval(()=>{
                this.time--;
                if(this.time == 0){
                    clearInterval(trimer)
                }
            },1000)
        }
    },

}
</script>

<style scoped>
    .updatepassword-container{
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      border-radius: 5px;
      background-color: #fff;
    }
    .updatepassword{
        width: 70%;
        border-radius: 5px;
        border: 1px solid #2d2d2d2d;
        padding: 2%;
    }
    .func{
        width: 100%;
        padding-bottom: 5%;
        display: flex;
        flex-direction: row;
    }
</style>