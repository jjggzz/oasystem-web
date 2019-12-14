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
        :filters="[{ text: '使用中', value: false }, { text: '已锁定', value: true }]"
        :filter-method="filterStatus"
        filter-placement="bottom-end">
        <template slot-scope="scope">
            <el-tag
            :type="scope.row.userStatus == false ? 'success' : 'warning'"
            disable-transitions>{{scope.row.userStatus == false ? '使用中':'已锁定'}}</el-tag>
        </template>
        </el-table-column>
        <el-table-column
        align="right"
        width="300">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入关键字搜索"/>
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="success"
            plain
            @click="handleEdit(scope.$index, scope.row)">解锁</el-button>
          <el-button
            size="mini"
            type="warning"
            plain
            @click="handleDelete(scope.$index, scope.row)">锁定</el-button>
            <el-button
            size="mini"
            type="primary"
            plain
            @click="handleDelete(scope.$index, scope.row)">详情</el-button>
            <el-button
            size="mini"
            type="danger"
            plain
            @click="handleDelete(scope.$index, scope.row)">注销</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="50%">
      
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    </el-main>
    </el-container>
</template>

<script>
  export default {
    computed:{
      showUserList:function(){
        return this.userData.filter((item)=>{
          if(this.createDate != null){
            if((item.userCreateTime >= this.createDate[0].getTime() && item.userCreateTime <= this.createDate[1].getTime() )&&(item.userAccount.includes(this.search)||item.userName.includes(this.search)||
            item.userPhone.includes(this.search)||item.userEmail.includes(this.search))){
              return item;
            }
          }
          else{
            //如果过滤时间为空则不进行比较
            if(item.userAccount.includes(this.search)||item.userName.includes(this.search)||
            item.userPhone.includes(this.search)||item.userEmail.includes(this.search)){
              return item;
            }
          }
          
        })
      }
    },
    data() {
      return {
        createDate:null,
        search: '',
        userData: [
            {
                userId:'1',
                userCreateTime:1572883200000,
                userAccount:'123456',
                userName:'张三',
                userPhone:'18376301879',
                userEmail:'123@123.com',
                userStatus:false,
                department:{
                  departmentId:'1',
                  departmentName:'土建学院',
                  departmentNumber:'1',
                  departmentLevel:'1',
                },
                Position:{
                  positionId:'1',
                  positionName:'院长',
                }
            },
            {
                userId:'2',
                userCreateTime:1575561600000,
                userAccount:'123456',
                userName:'李四',
                userPhone:'13737315945',
                userEmail:'123@123.com',
                userStatus:true,
                department:{
                  departmentId:'1',
                  departmentName:'信工学院',
                  departmentNumber:'1',
                  departmentLevel:'1',
                },
                Position:{
                  positionId:'1',
                  positionName:'书记',
                }
            },{
                userId:'2',
                userCreateTime:1575561600000,
                userAccount:'123456',
                userName:'李四',
                userPhone:'13737315945',
                userEmail:'123@123.com',
                userStatus:true,
                department:{
                  departmentId:'1',
                  departmentName:'信工学院',
                  departmentNumber:'1',
                  departmentLevel:'1',
                },
                Position:{
                  positionId:'1',
                  positionName:'书记',
                }
            },{
                userId:'2',
                userCreateTime:1575561600000,
                userAccount:'123456',
                userName:'李四',
                userPhone:'13737315945',
                userEmail:'123@123.com',
                userStatus:true,
                department:{
                  departmentId:'1',
                  departmentName:'信工学院',
                  departmentNumber:'1',
                  departmentLevel:'1',
                },
                Position:{
                  positionId:'1',
                  positionName:'书记',
                }
            },{
                userId:'2',
                userCreateTime:1575561600000,
                userAccount:'123456',
                userName:'李四',
                userPhone:'13737315945',
                userEmail:'123@123.com',
                userStatus:true,
                department:{
                  departmentId:'1',
                  departmentName:'信工学院',
                  departmentNumber:'1',
                  departmentLevel:'1',
                },
                Position:{
                  positionId:'1',
                  positionName:'书记',
                }
            },{
                userId:'2',
                userCreateTime:1575561600000,
                userAccount:'123456',
                userName:'李四',
                userPhone:'13737315945',
                userEmail:'123@123.com',
                userStatus:true,
                department:{
                  departmentId:'1',
                  departmentName:'信工学院',
                  departmentNumber:'1',
                  departmentLevel:'1',
                },
                Position:{
                  positionId:'1',
                  positionName:'书记',
                }
            },{
                userId:'2',
                userCreateTime:1575561600000,
                userAccount:'123456',
                userName:'李四',
                userPhone:'13737315945',
                userEmail:'123@123.com',
                userStatus:true,
                department:{
                  departmentId:'1',
                  departmentName:'信工学院',
                  departmentNumber:'1',
                  departmentLevel:'1',
                },
                Position:{
                  positionId:'1',
                  positionName:'书记',
                }
            },{
                userId:'2',
                userCreateTime:1575561600000,
                userAccount:'123456',
                userName:'李四',
                userPhone:'13737315945',
                userEmail:'123@123.com',
                userStatus:true,
                department:{
                  departmentId:'1',
                  departmentName:'信工学院',
                  departmentNumber:'1',
                  departmentLevel:'1',
                },
                Position:{
                  positionId:'1',
                  positionName:'书记',
                }
            },{
                userId:'2',
                userCreateTime:1575561600000,
                userAccount:'123456',
                userName:'李四',
                userPhone:'13737315945',
                userEmail:'123@123.com',
                userStatus:true,
                department:{
                  departmentId:'1',
                  departmentName:'信工学院',
                  departmentNumber:'1',
                  departmentLevel:'1',
                },
                Position:{
                  positionId:'1',
                  positionName:'书记',
                }
            },{
                userId:'2',
                userCreateTime:1575561600000,
                userAccount:'123456',
                userName:'李四',
                userPhone:'13737315945',
                userEmail:'123@123.com',
                userStatus:true,
                department:{
                  departmentId:'1',
                  departmentName:'信工学院',
                  departmentNumber:'1',
                  departmentLevel:'1',
                },
                Position:{
                  positionId:'1',
                  positionName:'书记',
                }
            },{
                userId:'2',
                userCreateTime:1575561600000,
                userAccount:'123456',
                userName:'李四',
                userPhone:'13737315945',
                userEmail:'123@123.com',
                userStatus:true,
                department:{
                  departmentId:'1',
                  departmentName:'信工学院',
                  departmentNumber:'1',
                  departmentLevel:'1',
                },
                Position:{
                  positionId:'1',
                  positionName:'书记',
                }
            },
        ],
        dialogVisible:false
      }
    },
    watch:{
      createDate:(newold)=>{
          console.log(newold[0].getTime())
      }
    },
    methods: {
       handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      filterStatus(value, row) {
        return row.userStatus == value;
      },
      createUser(){
          this.dialogVisible = true
      }
      
    }
  }
</script>

<style scoped>
  .right{
    position: absolute;
    right: 20px;
  }
</style>