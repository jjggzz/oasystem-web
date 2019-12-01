<template>
    <el-container direction="vertical">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="创建日期">
                <el-date-picker
                    v-model="formInline.createDate"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="用户名">
                <el-input v-model="formInline.name" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>
          <!-- 表格区域 -->
        <el-table
        :data="userData"
        style="width: 100%"
        :default-sort = "{prop: 'createDate', order: 'descending'}">
        <el-table-column
        prop="id"
        label="用户id">
        </el-table-column>
        <el-table-column
        prop="createDate"
        sortable
        label="创建时间">
        </el-table-column>
        <el-table-column
        prop="loginName"
        label="登录名">
        </el-table-column>
        <el-table-column
        prop="password"
        label="密码">
        </el-table-column>
        <el-table-column
        prop="name"
        label="用户名">
        </el-table-column>
        <el-table-column
        prop="dep"
        label="所属部门">
        </el-table-column>
        <el-table-column
        prop="phone"
        label="电话">
        </el-table-column>
        <el-table-column
        prop="email"
        label="邮箱">
        </el-table-column>
        <el-table-column
        prop="status"
        label="状态"
        :filters="[{ text: '使用中', value: 0 }, { text: '已锁定', value: 1 }]"
        :filter-method="filterStatus"
        filter-placement="bottom-end">
        <template slot-scope="scope">
            <el-tag
            :type="scope.row.status == 0 ? 'success' : 'warning'"
            disable-transitions>{{scope.row.status == 0 ? '使用中':'已锁定'}}</el-tag>
        </template>
        </el-table-column>
        <el-table-column
        fixed="right"
        label="操作"
        width="300">
            <el-button  type="warning" size="small">锁定</el-button>
            <el-button type="success" size="small">解锁</el-button>
            <el-button type="danger" size="small">注销</el-button>
            <el-button type="info" size="small">重置密码</el-button>
        </el-table-column>
    </el-table>
    </el-container>
</template>

<script>
  export default {
    data() {
      return {
        formInline: {
          createDate: '',
          name: ''
        },
        userData: [
            {
                id:'1',
                createDate:'2016-11-05',
                loginName:'123456',
                password:'123456',
                name:'张三',
                dep:'信息工程学院',
                phone:'18376301879',
                email:'123@123.com',
                status:0
            },{
                id:'2',
                createDate:'2016-11-02',
                loginName:'abcdef',
                password:'123456',
                name:'李四',
                dep:'土建学院',
                phone:'18376301879',
                email:'123@123.com',
                status:1
            },{
                id:'3',
                createDate:'2016-11-23',
                loginName:'123456',
                password:'123456',
                name:'王五',
                dep:'高博软件学院',
                phone:'18376301879',
                email:'123@123.com',
                status:0
            },{
                id:'4',
                createDate:'2016-11-14',
                loginName:'123456',
                password:'123456',
                name:'赵六',
                dep:'机质学院',
                phone:'18376301879',
                email:'123@123.com',
                status:0
            },{
                id:'1',
                createDate:'2016-11-08',
                loginName:'123456',
                password:'123456',
                name:'田七',
                dep:'艺术学院',
                phone:'18376301879',
                email:'123@123.com',
                status:1
            },{
                id:'1',
                createDate:'2016-11-01',
                loginName:'123456',
                password:'123456',
                name:'刘八',
                dep:'管理学院',
                phone:'18376301879',
                email:'123@123.com',
                status:0
            },
        ]
      }
    },
    methods: {
      filterStatus(value, row) {
        return row.status == value;
      },
      onSubmit() {
        console.log('submit!');
        console.log(this.formInline.createDate[0].getTime());
      }
    },
  }
</script>

<style>

</style>