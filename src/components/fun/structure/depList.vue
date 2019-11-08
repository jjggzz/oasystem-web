<template>
  <el-container>
      <el-main>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="部门名">
            <el-input v-model="formInline.depname" placeholder="请输入部门名"></el-input>
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
                        <el-form-item label="部门 ID">
                            <span>{{ props.row.id }}</span>
                        </el-form-item>
                        <el-form-item label="部门名">
                            <span>{{ props.row.name }}</span>
                        </el-form-item>
                        <el-form-item label="创建时间">
                            <span>{{ props.row.createDate }}</span>
                        </el-form-item>
                        <el-form-item label="部门状态">
                            <span>{{ props.row.status }}</span>
                        </el-form-item>
                        <el-form-item label="所属组织">
                            <span>{{ props.row.org }}</span>
                        </el-form-item>
                        <el-form-item label="部门人数">
                            <span>{{ props.row.employCount }}</span>
                        </el-form-item>
                        <el-form-item label="部门标签">
                            <span>{{ props.row.desc }}</span>
                        </el-form-item>
                        <el-form-item label="部门描述">
                            <span>{{ props.row.label }}</span>
                        </el-form-item>
                        </el-form>
                    </template>
                    </el-table-column>
                    <el-table-column
                    label="部门 ID"
                    prop="id">
                    </el-table-column>
                    <el-table-column
                    label="部门名称"
                    prop="name">
                    </el-table-column>
                    <el-table-column
                    label="创建时间"
                    prop="createDate">
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
                depname: ''
            },
            tableData5: [{
                id: '1001',
                name: '信息工程学院',
                createDate: '2019-11-08',
                org: '南宁学院',
                status: 1,
                employCount: 5,
                desc: '本学院主要教授计算机技术',
                label:'信息工程学院'
                },{
                id: '1001',
                name: '信息工程学院',
                createDate: '2019-11-08',
                org: '南宁学院',
                status: 1,
                employCount: 5,
                desc: '本学院主要教授计算机技术',
                label:'信息工程学院'
                },{
                id: '1001',
                name: '信息工程学院',
                createDate: '2019-11-08',
                org: '南宁学院',
                status: 1,
                employCount: 5,
                desc: '本学院主要教授计算机技术',
                label:'信息工程学院'
                },{
                id: '1001',
                name: '信息工程学院',
                createDate: '2019-11-08',
                org: '南宁学院',
                status: 1,
                employCount: 5,
                desc: '本学院主要教授计算机技术',
                label:'信息工程学院'
                },{
                id: '1001',
                name: '信息工程学院',
                createDate: '2019-11-08',
                org: '南宁学院',
                status: 1,
                employCount: 5,
                desc: '本学院主要教授计算机技术',
                label:'信息工程学院'
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