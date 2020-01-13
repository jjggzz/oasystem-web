<template>
  <el-table
    :data="show"
    style="width: 100%"
    :default-sort = "{prop: 'articleCreateTime', order: 'descending'}"
    height="540">
    <el-table-column
      label="序号"
      type="index">
    </el-table-column>
    <el-table-column
      label="发布日期"
      sortable
      prop="articleCreateTime">
    <template slot-scope="scope">
        {{scope.row.articleCreateTime | dateFormart}}
    </template>
    </el-table-column>
    <el-table-column
      label="标题"
      prop="articleTitle">
    </el-table-column>
    <el-table-column
      label="评论数"
      sortable
      prop="articleCommentCount">
    </el-table-column>
    <el-table-column
      label="浏览量"
      sortable
      prop="articlePageView">
    </el-table-column>
    <el-table-column
      label="状态"
      prop="articleState"
      :filters="[{ text: '正常', value: 0 }, { text: '已锁定', value: 1 }]"
      :filter-method="filterState"
      filter-placement="bottom-end">
      <template slot-scope="scope">
        <el-tag
          :type="scope.row.articleState == 0 ? 'success' : 'danger'"
          disable-transitions>{{scope.row.articleState == 0?"正常":'已锁定'}}</el-tag>
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
          type="primary"
          plain
          @click="articleInfo(scope.$index, scope.row)">详情</el-button>
          <el-button
          size="mini"
          type="success"
          plain
          @click="unlockArticle(scope.$index, scope.row)">解锁</el-button>
        <el-button
          size="mini"
          type="warning"
          plain
          @click="lockArticle(scope.$index, scope.row)">锁定</el-button>
        <el-button
          size="mini"
          type="danger"
          plain
          @click="delArticle(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
    computed: {
        show:function(){
            return this.$store.getters.getArticleListByType(1).filter((item)=>{
                if(item.articleTitle.includes(this.search)){
                    return item
                }
            })
        }
    },
    data() {
        return {
            search: ''
        }
    },
    methods: {
      filterState(value, row){
        return row.articleState == value;
      },
      articleInfo(index, row) {
          sessionStorage.setItem("articleDetailsId",row.articleId);
          console.log(index, row);
          this.$router.push({path:'/adminHome/articleInfoManage'})
      },
      //解锁
      unlockArticle(index, row) {
         if(row.articleState == 0){
          this.$message({
            type:"warning",
            message:"该文章已是解锁状态"
          })
          return
        }
        this.$confirm('此操作将解锁该文章，解锁后该文章可正常回复，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'success'
        }).then(() => {
          this.axios.put("/article/"+row.articleId,{articleState:0})
          .then((res)=>{
            if(res.data.status == 0){
              this.$message({
                type: 'success',
                message: res.data.msg
             }); 
             this.getArticleList()
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
              message: '请求解锁失败'
            });  
          })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消解锁'
          });          
        });
      },
      //锁定
      lockArticle(index, row) {
        if(row.articleState == 1){
          this.$message({
            type:"warning",
            message:"该文章已是锁定状态"
          })
          return
        }
        this.$confirm('此操作将锁定该文章，锁定后无法回复该文章，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.axios.put("/article/"+row.articleId,{articleState:1})
          .then((res)=>{
            if(res.data.status == 0){
              this.$message({
                type: 'success',
                message: res.data.msg
             }); 
             this.getArticleList()
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
              message: '请求锁定失败'
            });  
          })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消锁定'
          });          
        });
      },
      //删除
      delArticle(index, row) {
         this.$confirm('此操作将删除该文章，该操作不可逆，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error'
        }).then(() => {
          this.axios.delete("/article/"+row.articleId)
          .then((res)=>{
            if(res.data.status == 0){
              this.$message({
                type: 'success',
                message: res.data.msg
             }); 
             this.getArticleList()
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
            message: '取消删除'
          });          
        });
      },
      //获取帖子列表
      getArticleList(){
          this.axios.get("/article/articleList")
          .then((res)=>{
              if(res.data.status == 0){
                  this.$store.commit('updateArticleList',res.data.data.articleList)
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
                  message: "请求获取文章列表失败"
              }); 
          })
      }
    },
}
</script>

<style>

</style>