<template>
  <el-table
    :data="articleList"
    style="width: 100%"
    :default-sort = "{prop: 'articleCreateTime', order: 'descending'}">
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
      label="类型"
      prop="articleType">
    <template slot-scope="scope">
        {{scope.row.articleType == 0?'技术贴':'灌水贴'}}
    </template>
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
    
    },
    data() {
        return {
            articleList:[],
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
          this.$router.push({path:'/userHome/articleInfo'})
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
      getArticleList(){
          var info= JSON.parse(sessionStorage.getItem('userInfo'));
          this.axios.get("/article/userArticle/"+info.userId)
          .then((res)=>{
              if(res.data.status == 0){
                  this.articleList = res.data.data.articleList
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
    created() {
        this.getArticleList()
    },
}
</script>

<style>

</style>