<template>
  <el-container>
      <el-main>
        <el-table
          :data="showList"
          style="width: 100%">
          <el-table-column
            label="序号"
            type="index">
          </el-table-column>
          <el-table-column
            label="任务标题"
            prop="applyTitle">
          </el-table-column>
          <el-table-column
            label="任务描述"
            prop="applyDescription">
          </el-table-column>
          <el-table-column
            label="所属流程"
            prop="flow.flowName">
          </el-table-column>
          <el-table-column
            label="状态">
            <template slot-scope="scope">
            <el-tag type="warning">未提交</el-tag>
          </template>
          </el-table-column>
          <el-table-column
            align="right">
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
                @click="submitApply(scope.$index, scope.row)">提交</el-button>
              <el-button
                size="mini"
                type="primary"
                plain
                @click="alterApply(scope.$index, scope.row)">修改</el-button>
              <el-button
                size="mini"
                type="danger"
                plain
                @click="delApply(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
  </el-container>
</template>

<script>
export default {
  computed: {
    showList:function(){
      return this.applyList.filter((item)=>{
        if((item.applyState==0) &&(item.applyTitle.includes(this.search)||item.flow.flowName.includes(this.search))){
          return item
        }

      })
    }
  },
  data() {
    return {
      applyList: [],
      search: ''
    }
  },
  methods: {
    delApply(index, row){
        this.$confirm('此操作将永久删除该任务, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.axios.delete('/apply/'+row.applyId)
          .then((res)=>{
            if(res.data.status == 0){
              this.$message({
                type: 'success',
                message: res.data.msg
              });  
              this.getUserApplyList();
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
              message: '请求删除失败'
            });    
          })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    submitApply(index, row) {
        console.log(index, row);
      },
    alterApply(index, row) {
        console.log(index, row);
      },
    getUserApplyList(){
      var info = JSON.parse(sessionStorage.getItem('userInfo'))
      this.axios.get('/applyList/'+info.userId)
      .then((res)=>{
        console.log(res)
        if(res.data.status == 0){
          this.applyList = res.data.data.applyList;
        }
        else{
          this.$message.error(res.data.msg)
        }
      })
      .catch((res)=>{
        this.$message.warning("请求任务列表失败")
      })
    }
  },
  created() {
    this.getUserApplyList()
  },
}
</script>

<style>

</style>