<template>
  <el-container>
      <el-header>
          <el-row  type='flex' justify='space-between'>
          <el-col :span="6">
            <h1>灌水区</h1>
          </el-col>
          <el-col :span="7">
             <el-input size="small" placeholder="请输入关键字" v-model="search" class="input-with-select">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </el-col>
        </el-row>
      </el-header>
      <el-main style="padding:0px">
          <!-- hot -->
          <el-row v-for="(item,index) in showList" :key="item.articleId">
              <el-col>
                <el-card shadow="hover">
                  <div class="item">
                      <div >
                          <el-badge v-if="index<3 && search == ''" value="hot" class="item">
                              <div class="title">{{item.articleTitle}}</div>
                          </el-badge>
                          <div v-else class="title">{{item.articleTitle}}</div>
                        <div class="auth">
                            <div style="margin-right:10px">发布人：{{item.user.userName}}</div>
                            <div>发布时间：{{item.articleCreateTime|dateFormart}}</div>
                        </div>
                      </div>
                      <div class="click">
                        <div>评论数：{{item.articleCommentCount>999?"999+":item.articleCommentCount}}</div>
                        <div>浏览量：{{item.articlePageView>999?"999+":item.articlePageView}}</div>
                      </div>
                  </div>
                </el-card>
              </el-col>
          </el-row>
          
      </el-main>
  </el-container>
</template>

<script>
export default {
    computed: {
        showList:function(){
            return this.articleList.filter((item)=>{
                if(item.articleTitle.includes(this.search)){
                    return item
                }
            })
        }
    },
    data() {
        return {
            articleList:[],
            search:''
        }
    },
    methods: {
        getArticleList(){
            this.axios.get('/article/articleList/'+ 1)
            .then((res)=>{
                console.log(res)
                if(res.data.status == 0){
                    this.articleList = res.data.data.articleList
                }
                else{
                    this.$message({
                        type:'error',
                        message:res.data.msg
                    })
                }

            })
        }
    },
    created() {
        this.getArticleList()
    },
}
</script>

<style scoped>
    .item{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
    .title{
        color: #3a3838;
        font-size: 28px;
    }
    .auth{
        display: flex;
        flex-direction: row;
        align-items: center;
        color: #3a3838;
        font-size: 12px;
    }
    .click{
        color: #3a3838;
        font-size: 12px;
    }
</style>