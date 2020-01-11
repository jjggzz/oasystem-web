<template>
  <el-container >
    <!-- 头部导航栏 -->
    <el-header>
        <el-menu
          :default-active="activeIndex2"
          class="el-menu-demo"
          mode="horizontal"
          :router="true"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-menu-item index="/userHome/chat" >聊天模块</el-menu-item>
          <el-menu-item index="/userHome/notice" >通知模块</el-menu-item>
          <el-submenu index="3">
            <template slot="title">事务管理</template>
            <el-menu-item index="3-1">发起事务</el-menu-item>
            <el-menu-item index="3-2">我的事务</el-menu-item>
            <el-menu-item index="3-3">审批事务</el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">文件列表</template>
            <el-menu-item index="/userHome/noticeFile">通知文件</el-menu-item>
            <el-menu-item index="/userHome/myFile">我的文件</el-menu-item>
          </el-submenu>
           <el-menu-item index="/userHome/memberList">成员名册</el-menu-item>
           <el-submenu index="6" >
            <template slot="title">组织论坛</template>
            <el-menu-item index="/userHome/technology">技术求助</el-menu-item>
            <el-menu-item index="/userHome/waffle">灌水专区</el-menu-item>
            <el-menu-item index="/userHome/sendArticle">我要发帖</el-menu-item>
          </el-submenu>
          <el-submenu index="7" >
            <template slot="title">个人中心</template>
            <el-menu-item  @click="dialog = true">个人信息</el-menu-item>
            <el-menu-item @click="dialogFormVisible = true">修改密码</el-menu-item>
            <el-menu-item  >我的帖子</el-menu-item>
          </el-submenu>
          <el-menu-item  @click="dialogcalendarVisible = true">日历</el-menu-item>
          <el-menu-item  @click="logout" class="right">
            <i class="el-icon-switch-button"></i>
          </el-menu-item>
        </el-menu>
    </el-header>
    <el-main>
      <router-view></router-view>
      <el-drawer
        title="日历"
        :visible.sync="dialogcalendarVisible"
        direction="rtl"
        size="50%">
        <el-calendar v-model="calendar"></el-calendar>
      </el-drawer>
      <!-- 修改密码 -->
      <el-dialog title="修改密码" :visible.sync="dialogFormVisible">
      <el-form :model="updatePasswordForm" :rules="updatePasswordFormRule" ref='updatePasswordForm'>
        <el-form-item label="原密码" prop="oldPassword" :label-width="formLabelWidth">
          <el-input type="password" v-model="updatePasswordForm.oldPassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword" :label-width="formLabelWidth">
          <el-input type="password" v-model="updatePasswordForm.newPassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="rePassword" :label-width="formLabelWidth">
          <el-input type="password" v-model="updatePasswordForm.rePassword" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="clearUpdatePassword">取 消</el-button>
        <el-button type="primary" @click="updatePassword('updatePasswordForm')">确 定</el-button>
      </div>
    </el-dialog>
      <!-- 个人信息 -->
      <el-drawer
        title="个人信息"
        :before-close="cancelForm"
        :visible.sync="dialog"
        direction="rtl"
        custom-class="demo-drawer"
        ref="drawer"
        >
       <div class="photo">
          <el-upload
            class="avatar-uploader"
            :action="'http://localhost:8081/oasystem/user/uploadPortrait/'+this.accountInfo.userId"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <el-image
            v-if="accountInfo.portrait != null"
            class="touyin"
            style="width: 100px; height: 100px;border-radius: 50%"
            :src="accountInfo.portrait"
            :fit="'cover'"></el-image>
          <div v-else class="touyin"
          style="width: 100px; height: 100px;border-radius: 50%">
            <i class="el-icon-plus avatar-uploader-icon"></i>
          </div>
          </el-upload>
        </div>
        <div class="demo-drawer__content">
          <el-form :model="accountInfo" label-position="right">
            <el-form-item label="用户名" :label-width="formLabelWidth">
              <el-input v-model="accountInfo.userName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="登录名" :label-width="formLabelWidth">
              <el-input v-model="accountInfo.userAccount" :disabled='true' autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="个人电话" :label-width="formLabelWidth">
              <el-input v-model="accountInfo.userPhone" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" :label-width="formLabelWidth">
              <el-input v-model="accountInfo.userEmail" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item v-if="accountInfo.userDepartmentName!=null && accountInfo.userDepartmentName != '' " label="所属部门" :label-width="formLabelWidth">
              {{accountInfo.userDepartmentName}}
            </el-form-item>
            <el-form-item label="职位" :label-width="formLabelWidth">
              {{accountInfo.position}}
            </el-form-item>
          </el-form>
          <div class="demo-drawer__footer">
            <el-button @click="cancelForm">取 消</el-button>
            <el-button type="primary" @click="updateAccountInfo" :loading="loading">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
          </div>
        </div>
      </el-drawer>
    </el-main>
    <!-- <el-footer>
      页脚部分
      <p class="footer">作者邮箱:1945282561@qq.com 后端框架:springboot(ssm) ui框架:elementUI js框架:vue</p>
    </el-footer> -->
  </el-container>
</template>

<script>
export default {
  data() {
    //ajax校验原密码是否正确
    var checkPasswordIsCorrect = (rule,value,callback)=>{
        this.axios.post("/authentication/checkPassword",{userPassword:value})
        .then((res)=>{  
          if(res.data.status == 0){
            callback()
          }
          else{
            callback(new Error(res.data.msg))
          }
        })
        .catch((res)=>{
          callback(new Error('异步校验密码失败'))
        })
    }
    //校验两次密码是否一致
    var checkRePassword = (rule,value,callback)=>{
        if(value === ''){
          callback(new Error('请再次输入密码'));
        }
        else if(value !== this.updatePasswordForm.newPassword){
            callback(new Error('两次输入密码不一致!'));
        }
        else{
          callback()
        }
    }
    return {
      dialogcalendarVisible: false,
      calendar:new Date(),
      dialogTableVisible: false,
      dialogFormVisible: false,
      updatePasswordForm: {
        oldPassword: '',
        newPassword:'',
        rePassword:''
      },
      updatePasswordFormRule:{
        oldPassword:[
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { validator:checkPasswordIsCorrect,trigger: 'blur'}
        ],
        newPassword:[
          { required: true, message: '新密码不能为空', trigger: 'blur' },
        ],
        rePassword:[
          { validator: checkRePassword, trigger: 'blur' }
        ]
      },
      activeIndex2: '/userHome/chat',
      formLabelWidth: '80px',
      timer: null,
      dialog: false,
      loading: false,
      accountInfo: {
        userId:'',
        portrait: '',
        position: '',
        userAccount:'',
        userEmail:'',
        userName:'',
        userPhone:'',
        userDepartmentName:''
      },
    }
  },
  methods: {
    logout(){
      this.axios.get('/authentication/userLogout')
      .then((res)=>{
        if(res.data.status == 0){
          this.$message({
            type:"success",
            message:res.data.msg
          })
          sessionStorage.clear()
          this.$router.push({path:'/'})
        }
        else{
          this.$message({
            type:"error",
            message:res.data.msg
          })
        }
      })
      .catch((res)=>{
         this.$message({
            type:"error",
            message:"请求安全退出失败"
          })
      })
      
    },
    //头像上传成功处理函数
     handleAvatarSuccess(res, file) {
       console.log(res)
        this.$message({
            message: res.msg,
            type: 'info'
          })
      this.getUserPublicInfo()
        // this.portrait = URL.createObjectURL(file.raw);
      },
    //上传头像格式校验
    beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
    clearUpdatePassword(){
      //将表单清空
      this.updatePasswordForm.oldPassword = ''
      this.updatePasswordForm.newPassword = ''
      this.updatePasswordForm.rePassword = ''
      this.dialogFormVisible = false
    },
        //修改账号信息
    updateAccountInfo(){
        this.axios.put("/user/"+this.accountInfo.userId,
        {userName:this.accountInfo.userName,
        userEmail:this.accountInfo.userEmail,
        userPhone:this.accountInfo.userPhone})
        .then((res)=>{
          if(res.data.status == 0){
            //修改成功弹窗显示
            this.$message({
              message: res.data.msg,
              type: 'success'
            })
          }
          else{
            //失败重新获取用户信息
             this.$message({
                message: res.data.msg,
                type: 'error'
              })
          }
          this.getUserPublicInfo()
        })
        .catch((res)=>{
          this.$message({
            message: '修改个人信息请求失败',
            type: 'warning'
          })
        })

    },
    getUserPublicInfo(){
      this.axios.get("/user/userPublicInfo/"+this.accountInfo.userId)
      .then((res)=>{
          if(res.data.status == 0){
            sessionStorage.setItem("userInfo",JSON.stringify(res.data.data))
            this.accountInfo = JSON.parse(sessionStorage.getItem("userInfo"))
          }
      })
      .catch((res)=>{

      })
    },
    //修改密码
    updatePassword(formName){
      this.$refs[formName].validate((valid) => {
          if (valid) {
            this.axios.put("/authentication/updatePassword",{userPassword:this.updatePasswordForm.newPassword})
            .then((res)=>{
              if(res.data.status==0){
                this.$message({
                  message: res.data.msg,
                  type: 'success'
                })
                this.$router.push({path:'/login'})
              }
              else{
                this.$message({
                  message: res.data.msg,
                  type: 'error'
                })
              }
              this.clearUpdatePassword()
            })
            .catch((res)=>{
                this.$message({
                  message: '修改密码请求失败',
                  type: 'warning'
                })
            })


          } else {
            console.log('error submit!!');
            return false;
          }
      });

      
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
      cancelForm() {
        this.loading = false;
        this.dialog = false;
      }
  },
  created() {
    this.accountInfo = JSON.parse(sessionStorage.getItem("userInfo"))
  },

}
</script>

<style scoped>
.touyin{
     box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
  }
  .photo{
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center
  }
  .right{
    position: absolute;
    right: 0px;
  }
  .footer{
    text-align: center;
  }
   .demo-drawer__content{
    padding: 20px;
  }
  .demo-drawer__footer{
    width: 100%;
    bottom: 0px;
    padding-bottom: 20px;
    display: flex;
    flex-direction: row;
    justify-content:space-around
  }

</style>