<template>
    <el-container>
        <el-header>
            <div class="right">
                <router-link to="/register">
                    <el-button round>
                        去注册
                    </el-button>
                </router-link>
            </div>  
        </el-header>
        <el-main>
            <el-row type="flex" align="middle">
                <el-col :span="16">
                    <div class="kk">
                        123
                    </div>
                </el-col>
                <el-col :span="8">
                    <el-form ref="loginForm" label-position="left" :model="form" :rules="rules" label-width="80px" class="login-box">
                    <h3 class="login-title">欢迎登录</h3>
                    <el-form-item label="登陆名" prop="userLoginName">
                        <el-input v-model="form.userLoginName" placeholder="请输入用户名"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="userPassword">
                        <el-input v-model="form.userPassword" placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <el-form-item >
                        <el-button type="primary" @click="login('loginForm')">登陆</el-button>
                    </el-form-item>
                </el-form>
                </el-col>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
export default {
    data() {
        return {
            form:{
                userLoginName:'',userPassword:''
            },
             rules: {
                userLoginName: [
                    {required: true, message: '账号不可为空', trigger: 'blur'}
                ],
                userPassword: [
                    {required: true, message: '密码不可为空', trigger: 'blur'}
                ]
            }
        }
    },
    methods: {
        login(formName){
            this.$refs[formName].validate((valid)=>{
                if(valid){

                    this.$router.push({path:'/home/chat'})
                }
                else{
                    //校验未通过,不提交表单
                    return false
                }
            })
            


            
        }
    },
}
</script>

<style scoped>
    .login-box {
    border: 1px solid #DCDFE6;
    width: 350px;
    margin:  auto;
    padding: 35px 35px 15px 35px;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    box-shadow: 0 0 25px #909399;
  }

  .login-title {
    text-align: center;
    margin: 0 auto 15px auto;
    color: #303133;
  }
  .right{
      display: flex;
      justify-content: flex-end;
  }
  .kk{
    height: 500px;
  }

</style>