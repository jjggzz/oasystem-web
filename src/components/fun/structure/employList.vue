<template>
  <el-container>
      <el-main>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="用户名">
            <el-input v-model="formInline.userName" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
        </el-form>
        <el-row :gutter="20">
            <el-col :span="16">
                <el-table
                    :data="tableData5"
                    height="400"
                    style="width: 100%">
                    <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="用户 id">
                            <span>{{ props.row.id }}</span>
                        </el-form-item>
                        <el-form-item label="用户名">
                            <span>{{ props.row.userName }}</span>
                        </el-form-item>
                        <el-form-item label="所属部门">
                            <span>{{ props.row.depName }}</span>
                        </el-form-item>
                        <el-form-item label="性别">
                            <span>{{ props.row.sex }}</span>
                        </el-form-item>
                        <el-form-item label="职位">
                            <span>{{ props.row.position }}</span>
                        </el-form-item>
                        <el-form-item label="手机号码">
                            <span>{{ props.row.phone }}</span>
                        </el-form-item>
                        <el-form-item label="邮箱">
                            <span>{{ props.row.email }}</span>
                        </el-form-item>
                        <el-form-item label="年龄">
                            <span>{{ props.row.age }}</span>
                        </el-form-item>
                        <el-form-item label="入职时间">
                            <span>{{ props.row.joinDate }}</span>
                        </el-form-item>
                        </el-form>
                    </template>
                    </el-table-column>
                    <el-table-column
                    label="用户名"
                    prop="userName">
                    </el-table-column>
                    <el-table-column
                    label="所属部门"
                    prop="depName">
                    </el-table-column>
                    <el-table-column
                    label="手机号码"
                    prop="phone">
                    </el-table-column>
                </el-table>
            </el-col>
            <el-col :span="8"></el-col>
        </el-row>
      </el-main>
  </el-container>
</template>

<script>
export default {
    data() {
        return {
            formInline: {
                userName: ''
            },
            tableData5: [{
                id: '10001',
                userName: '张三',
                depName: '信息工程学院',
                sex: '男',
                position: "部长",
                phone: "18376301879",
                email: '1945282561@qq.com',
                age:18,
                joinDate:'2019-11-08'
                }]
        }
    },
    methods: {
        onSubmit() {
         console.log('submit!');
        }
    },
}
</script>

<style scoped>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>