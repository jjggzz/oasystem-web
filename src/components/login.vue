<template>
    <el-container>
        <el-header>
 
        </el-header>
        <el-main class="main">
            <el-row type="flex" align="middle" justify="end">

                <el-col :xs="18" :sm="14" :md="10" :lg="8" :xl="8" >
                    <el-form ref="loginForm" label-position="left" :model="form" :rules="rules" label-width="80px" class="login-box">
                    <h3 class="login-title">欢迎登录</h3>
                    <el-form-item label="登陆名" prop="userLoginName">
                        <el-input v-model="form.userLoginName" placeholder="请输入用户名"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="userPassword">
                        <el-input v-model="form.userPassword" placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <el-form-item label="登录方式">
                        <el-radio v-model="radio" label="1">用户登录</el-radio>
                        <el-radio v-model="radio" label="2">管理员登录</el-radio>
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
             radio: '1',
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
                    if(this.radio=='1'){
                        this.$router.push({path:'/userHome'})
                    }
                    else{
                        this.$router.push({path:'/adminHome'})
                    }
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
    width: 70%;
    margin:  auto;
    padding: 35px 35px 15px 35px;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    box-shadow: 0 0 25px #909399;
    background-color: #fff;
  }

  .login-title {
    text-align: center;
    margin: 0 auto 15px auto;
    color: #303133;
  }
  .main{
      margin-top: calc(15vh)
  }


</style>