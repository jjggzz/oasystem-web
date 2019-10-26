<template>
    <el-container>
        <el-header>
            <div class="right">
                <router-link to="/login">
                    <el-button round>
                        去登陆
                    </el-button>
                </router-link>
            </div>  
        </el-header>
        <el-main>
            <el-form ref="registerForm" label-position="left" :rules="rules" :model="form" label-width="80px" class="register-box">
                <h3 class="register-title">请注册</h3>
                <el-form-item label="用户名" prop="userName">
                    <el-input v-model="form.userName" placeholder="请输入您用户名"></el-input>
                </el-form-item>
                <el-form-item label="登陆名" prop="userLoginName">
                    <el-input v-model="form.userLoginName" placeholder="请输入您登陆名"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="userPassword">
                    <el-input v-model="form.userPassword" placeholder="请输入6-15位的密码"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="rePassword">
                    <el-input v-model="form.rePassword" placeholder="两次密码必须一致"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="userEmail">
                    <el-input v-model="form.userEmail" placeholder="请输入您的邮箱"></el-input>
                </el-form-item>
                <el-form-item label="电话号码" prop="userPhone"> 
                    <el-input v-model="form.userPhone" placeholder="请输入您的电话号码"></el-input>
                </el-form-item>
                <el-form-item >
                    <el-button type="primary" @click="register('registerForm')">注册</el-button>
                </el-form-item>
            </el-form>
        </el-main>
    </el-container>
</template>

<script>

export default {
    data() {
        //自定义校验规则
        let validateLoginName = (rule, value, callback)=>{
            if(value === "123"){
                callback(new Error('执行了自定义的方法'))
            }
            else{
                callback()
            }
        }
        return {
            form:{
                userName:'',userLoginName:'',userPassword:'', rePassword:'',userEmail:'',userPhone:''
            },
            rules:{
                userName:[
                    {required: true, message: '昵称不能为空', trigger: 'blur'}
                ],
                userLoginName:[
                    {required: true, message: '登陆名不能为空', trigger: 'blur'},
                    {validator: validateLoginName, trigger: 'blur'}
                ],
                userPassword:[
                    {required: true, message: '密码不能为空', trigger: 'blur'},
                    { min: 6, max: 15,  message: '长度在 6 到 15 个字符', trigger: 'blur'}
                ],
                rePassword:[
                    {required: true, message: '密码不能为空', trigger: 'blur'}
                ],
                userEmail:[
                    {required: true, message: '邮箱不能为空', trigger: 'blur'},
                    {type:"email", message: '邮箱格式不正确', trigger: 'blur'}
                ],
                userPhone:[
                    {required: true, message: '电话号码不能为空', trigger: 'blur'}
                ]
            }
        }
    },
    methods: {
        register(formName){
            this.$refs[formName].validate((valid)=>{
                if(valid){
                    alert("注册成功")
                    
                }
                else{
                    //校验未通过,不提交表单
                    return false
                }
            })
        }
    }
}
</script>

<style scoped>
    .register-box{
        border: 1px solid #DCDFE6;
        width: 350px;
        margin:  auto;
        padding: 35px 35px 15px 35px;
        border-radius: 5px;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        box-shadow: 0 0 25px #909399;
    }
    .register-title {
        text-align: center;
        margin: 0 auto 15px auto;
        color: #303133;
    }
  .right{
      display: flex;
      justify-content: flex-end;
  }

</style>