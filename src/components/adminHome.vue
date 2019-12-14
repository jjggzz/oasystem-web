<template>
  <el-container>
    <el-header>
      <!-- 头部导航条 -->
      <el-menu
        :default-active="default_active"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        :router="true"
        active-text-color="#ffd04b"
        >
        <el-menu-item index="/adminHome/adminExclusive">管理员专属</el-menu-item>
        <el-menu-item index="/adminHome/userManage" >用户管理</el-menu-item>
        <el-menu-item index="3">部门管理</el-menu-item>
        <el-submenu index="4">
          <template slot="title">结构管理</template>
          <el-submenu index="4-1">
            <template slot="title">人员管理</template>
            <el-menu-item index="2-4-1">部门分配</el-menu-item>
            <el-menu-item index="2-4-2">职位分配</el-menu-item>
          </el-submenu>
          <el-menu-item index="4-2">职务管理</el-menu-item>
          <el-menu-item index="4-3">流程管理</el-menu-item>
      </el-submenu>
        <el-menu-item index="5">权限管理</el-menu-item>
        <el-menu-item index="6">论坛管理</el-menu-item>
         <el-submenu index="7" >
            <template slot="title">个人中心</template>
            <el-menu-item  @click="dialog = true">个人信息</el-menu-item>
            <el-menu-item index="7-2">未读消息</el-menu-item>
            <el-menu-item @click="dialogFormVisible = true">修改密码</el-menu-item>
          </el-submenu>
      </el-menu>
    </el-header>
    <el-main > 
      <!-- 页面主体 -->
      <router-view></router-view>
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
        :before-close="handleClose"
        :visible.sync="dialog"
        direction="rtl"
        custom-class="demo-drawer"
        ref="drawer"
        >
        <div class="photo">
          <el-image
          class="touyin"
          style="width: 100px; height: 100px;border-radius: 50%"
          :src="accountInfo.portrait==null||accountInfo.portrait===''?'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png':accountInfo.portrait"
          :fit="'cover'"></el-image>
          <div style="padding: 15px">
          <el-button>更换头像</el-button>
          </div>
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
            <el-form-item v-if="accountInfo.userDepartment!=null && accountInfo.userDepartment != '' " label="所属部门" :label-width="formLabelWidth">
              {{accountInfo.userDepartment}}
            </el-form-item>
            <el-form-item label="职位" :label-width="formLabelWidth">
              {{accountInfo.position}}
            </el-form-item>
          </el-form>
          <div class="demo-drawer__footer">
            <el-button @click="cancelForm">取 消</el-button>
            <el-button type="primary" @click="$refs.drawer.closeDrawer()" :loading="loading">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
          </div>
        </div>
      </el-drawer>
    </el-main>
    <!-- <el-footer >
      <p class="footer">作者邮箱:1945282561@qq.com 后端框架:springboot(ssm) ui框架:elementUI js框架:vue</p>
    </el-footer> -->
</el-container>
</template>

<script>

export default {
  data() {
    //ajax校验原密码是否正确
    var checkPasswordIsCorrect = (rule,value,callback)=>{
        this.axios.post("user/checkPassword",{userPassword:value})
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
      dialog: false,
      loading: false,
      default_active: '/adminHome/adminExclusive',
      accountInfo: {
        portrait: '',
        position: '',
        userAccount:'',
        userEmail:'',
        userName:'',
        userPhone:'',
        userDepartment:''
      },
      formLabelWidth: '80px',
      timer: null,
    }
  },
  methods: {
    clearUpdatePassword(){
      //将表单清空
      this.updatePasswordForm.oldPassword = ''
      this.updatePasswordForm.newPassword = ''
      this.updatePasswordForm.rePassword = ''
      this.dialogFormVisible = false
    },
    //修改密码
    updatePassword(formName){
      this.$refs[formName].validate((valid) => {
          if (valid) {
            this.axios.put("/user/updatePassword",{userPassword:this.updatePasswordForm.newPassword})
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
    handleClose(done) {
      if (this.loading) {
        return;
      }
        this.loading = true;
      this.timer = setTimeout(() => {
        done();
        // 动画关闭需要一定的时间
        setTimeout(() => {
          this.loading = false;
        }, 400);
      }, 2000);

    },
    cancelForm() {
      this.loading = false;
      this.dialog = false;
      clearTimeout(this.timer);
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
  .footer{
    text-align: center;
  }

</style>