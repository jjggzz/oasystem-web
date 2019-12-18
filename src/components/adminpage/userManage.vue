<template>
    <el-container direction="vertical">
      <el-main style="padding:0px">
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="创建日期">
                <el-date-picker
                    v-model="createDate"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item class="right">
                <el-button type="success" @click="createUser" >生成用户</el-button>
            </el-form-item>
        </el-form>
          <!-- 表格区域 -->
        <el-table
        :data="showUserList"
        style="width: 100%"
        :default-sort = "{prop: 'userCreateTime', order: 'descending'}"
        height="540">
        <el-table-column
        type="index"
        label="序号">
        </el-table-column>
        <el-table-column
        prop="userCreateTime"
        sortable
        label="创建时间">
        <template slot-scope="scope">
          {{scope.row.userCreateTime | dateFormart}}
        </template>
        </el-table-column>
        <el-table-column
        prop="userAccount"
        label="登录名">
        </el-table-column>
        <el-table-column
        prop="userName"
        label="用户名">
        </el-table-column>
        <el-table-column
        prop="department.departmentName"
        label="所属部门">
        </el-table-column>
        <el-table-column
        prop="userPhone"
        label="电话">
        </el-table-column>
        <el-table-column
        prop="userEmail"
        label="邮箱">
        </el-table-column>
        <el-table-column
        prop="userStatus"
        label="状态"
        :filters="[{ text: '使用中', value: true }, { text: '已锁定', value: false }]"
        :filter-method="filterStatus"
        filter-placement="bottom-end">
        <template slot-scope="scope">
            <el-tag
            :type="scope.row.userStatus == true ? 'success' : 'warning'"
            disable-transitions>{{scope.row.userStatus == true ? '使用中':'已锁定'}}</el-tag>
        </template>
        </el-table-column>
        <el-table-column
        align="right"
        width="200">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入关键字搜索"/>
        </template>
        <template slot-scope="scope">
        <el-dropdown>
          <el-button size="mini" type="primary">
            管理用户<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <el-button type="text" icon="iconfont icon-myIconxiangqing" @click="userDetails(scope.$index, scope.row)">详情</el-button>
            </el-dropdown-item>
            <el-dropdown-item >
              <el-button type="text" icon="iconfont icon-myIconiconset0192" @click="userUnlock(scope.$index, scope.row)">解锁</el-button>
            </el-dropdown-item>
            <el-dropdown-item >
              <el-button type="text" icon="iconfont icon-myIconsuoding" @click="userLock(scope.$index, scope.row)">锁定</el-button>
            </el-dropdown-item>
            <el-dropdown-item >
              <el-button type="text" icon="iconfont icon-myIconzhongzhi" @click="userReset(scope.$index, scope.row)">重置密码</el-button>
            </el-dropdown-item>
            <el-dropdown-item >
              <el-button type="text" icon="iconfont icon-myIconzhuxiao" @click="userCancel(scope.$index, scope.row)">注销</el-button>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%">
      <p>新账号：{{newAccount}}</p>
      <p>密码默认为123456</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="createAccount">生成</el-button>
      </span>
    </el-dialog>
    </el-main>
    </el-container>
</template>

<script>
  export default {
    computed:{
      showUserList:function(){
        return this.userList.filter((item)=>{
          if(this.createDate != null){
            if((item.userCreateTime >= this.createDate[0].getTime() && item.userCreateTime <= this.createDate[1].getTime() )&&(item.userAccount.includes(this.search)||(item.userName!=null&&item.userName.includes(this.search))||
            (item.userPhone!=null&&item.userPhone.includes(this.search))||(item.userEmail!=null&&item.userEmail.includes(this.search)))){
              return item;
            }
          }
          else{
            //如果过滤时间为空则不进行比较
            if(item.userAccount.includes(this.search)||(item.userName!=null&&item.userName.includes(this.search))||
            (item.userPhone!=null&&item.userPhone.includes(this.search))||(item.userEmail!=null&&item.userEmail.includes(this.search))){
              return item;
            }
          }
          
        })
      }
    },
    data() {
      return {
        newAccount:'',
        createDate:null,
        search: '',
        dialogVisible:false,
        userList:[]
      }
    },
    methods: {
      //用户详情
      userDetails(index,row){
        console.log(row)
      },
      //用户解锁
      userUnlock(index,row){
        //如果账号正在使用中
        if(row.userStatus){
          this.$message({
            type:'warning',
            message:"该账户未被锁定"
          })
          return;
        }else{
          //确认解锁？
          this.$confirm('执行此操作后该账户可正常登录', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'success'
          }).then(() => {
            //发起解锁请求
            this.axios.put("/user/"+row.userId,{userStatus:true})
            .then((res)=>{
                //消息提示
                if(res.data.status == 0){
                  this.$message({
                    type: 'success',
                    message: res.data.msg
                  }); 
                  //更新列表
                  this.getUserList()
                }
                else{
                  this.$message({
                    type: 'error',
                    message: res.data.msg
                  }); 
                }
            })
            .catch((res)=>{
              this.$message({
                type: 'warning',
                message: '请求解锁账号失败'
              });  
            })
            
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消解锁账号'
            });          
          });
        }
      },
      //用户锁定
      userLock(index,row){
        console.log(row)
        //如果账号正在使用中
        if(!row.userStatus){
          this.$message({
            type:'warning',
            message:"该账户已被锁定"
          })
          return;
        }else{
          //确认解锁？
          this.$confirm('执行此操作后该账户将不可登录', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            //发起解锁请求
            this.axios.put("/user/"+row.userId,{userStatus:false})
            .then((res)=>{
                //消息提示
                if(res.data.status == 0){
                  this.$message({
                    type: 'success',
                    message: res.data.msg
                  }); 
                  //更新列表
                  this.getUserList()
                }
                else{
                  this.$message({
                    type: 'error',
                    message: res.data.msg
                  }); 
                }
            })
            .catch((res)=>{
              this.$message({
                type: 'warning',
                message: '请求锁定账号失败'
              });  
            })
            
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消锁定账号'
            });          
          });
        }
      },
      //用户重置密码
      userReset(index,row){
          //确认重置？
          this.$confirm('执行此操作后该账户密码将重置为123456', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            //发起解锁请求
            this.axios.put("/user/"+row.userId,{userAccount:row.userAccount,userPassword:"123456"})
            .then((res)=>{
                //消息提示
                if(res.data.status == 0){
                  this.$message({
                    type: 'success',
                    message: res.data.msg
                  }); 
                  //更新列表
                  this.getUserList()
                }
                else{
                  this.$message({
                    type: 'error',
                    message: res.data.msg
                  }); 
                }
            })
            .catch((res)=>{
              this.$message({
                type: 'warning',
                message: '请求重置密码失败'
              });  
            })
            
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取重置密码'
            });          
          });
      },
      //用户注销
      userCancel(index,row){
        //确认注销？
          this.$confirm('执行此操作后将删除该账户，注意此操作不可逆', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            //发起解锁请求
            this.axios.delete("/user/"+row.userId)
            .then((res)=>{
                //消息提示
                if(res.data.status == 0){
                  this.$message({
                    type: 'success',
                    message: res.data.msg
                  }); 
                  //更新列表
                  this.getUserList()
                }
                else{
                  this.$message({
                    type: 'error',
                    message: res.data.msg
                  }); 
                }
            })
            .catch((res)=>{
              this.$message({
                type: 'warning',
                message: '请求删除账号失败'
              });  
            })
            
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取删除'
            });          
          });
      },
      //创建账户
      createAccount(){
        this.axios.post('user/add',{})
        .then((res)=>{
          console.log(res)
          if(res.data.status == 0){
            //将新账户添加到显示数组中
            this.newAccount = res.data.data.newUser.userAccount
            this.userList.push(res.data.data.newUser)
            this.$message({
              type:'success',
              message:res.data.msg
            })
          }
          else{
            this.$message({
              type:'error',
              message:res.data.msg
            })
          }
        })
        .catch((res)=>{
            this.$message({
              type:'warning',
              message:"请求生成用户失败"
            })
        })

      },
      //状态过滤
      filterStatus(value, row) {
        return row.userStatus == value;
      },
      //创建用户显示框出现
      createUser(){
          this.dialogVisible = true
      },
      getUserList(){
        this.axios.get("/user/userList")
        .then((res)=>{
          console.log(res)
          if(res.data.status == 0){
            this.userList = res.data.data.userList
            this.$message({
              message: res.data.msg,
              type: 'success'
            })
          }
          else{
            this.$message({
              message: res.data.msg,
              type: 'error'
            })
          }

        })
        .catch((res)=>{
          this.$message({
              message: "请求用户列表失败",
              type: 'warning'
            })
        })
      }
    },
    created() {
      this.getUserList()
    },
  }
</script>

<style scoped>
  .right{
    position: absolute;
    right: 20px;
  }
</style>