<template>
    <el-container>
        <el-main>
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="时间">
                <el-date-picker
                  v-model="date"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="文件名">
                <el-input
                  placeholder="请输入文件名"
                  v-model="fileName"
                  clearable>
                </el-input>
            </el-form-item>
            <el-form-item label="发送人">
                <el-input
                  placeholder="请输入发送人"
                  v-model="sender"
                  clearable>
                </el-input>
            </el-form-item>
        </el-form>
        <el-table
            height="400"
            :data="tableData"
            style="width: 100%">
            <el-table-column
            label="日期"
            width="180">
            <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.date }}</span>
            </template>
            </el-table-column>
            <el-table-column
            label="发送人"
            width="180">
            <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                <p>姓名: {{ scope.row.name }}</p>
                <p>部门: {{ scope.row.dep }}</p>
                <div slot="reference" class="name-wrapper">
                    <el-tag size="medium">{{ scope.row.name }}</el-tag>
                </div>
                </el-popover>
            </template>
            </el-table-column>
            <el-table-column
            label="文件名"
            width="300">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.fileName }}</span>
            </template>
            </el-table-column>
            <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">下载</el-button>
                <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
            </el-table-column>
            <el-table-column label="文件数量: 5"></el-table-column>
        </el-table>
        </el-main>
    </el-container>
</template>

<script>
export default {
data() {
      return {
        date:'',
        fileName:'',
        sender:'',
        tableData: [{
          date: '2016-05-02',
          name: '张三',
          dep: '技术部',
          fileName:'关于开展新员工的培训'
        }, {
          date: '2016-05-04',
          name: '李四',
          dep: '人事部',
          fileName:'关于2019-11-03日的校园招聘'
        }, {
          date: '2016-05-01',
          name: '王五',
          dep: '财务部',
          fileName:'报销统计'
        }, {
          date: '2016-05-03',
          name: '赵六',
          dep: '业务部',
          fileName:'一号业务对象的信息'
        }]
      }
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    },
    watch: {
      date:function(newValue,oldValue){
        console.log(newValue)
      }
    },
}
</script>

<style>

</style>