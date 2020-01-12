<template>
  <el-container>
      <el-header>
          <el-page-header @back="goBack" content="详情页面"></el-page-header>
      </el-header>
      <el-main style="padding:0px;">
          <!-- 贴子信息 -->
        <el-row type='flex' justify="start" align='middle'>
            <el-col :span="24">
                <div class="articleInfo-container">
                    <div class="head">
                        <div style="font-size:12px;color:#5f5e5e;">{{articleInfo.user.userName}}</div>
                        <el-avatar fit='cover' shape="circle" :size="50" :src="articleInfo.user.userHeadPortrait"></el-avatar>
                    </div>
                    <div class="content-box">
                        <div style="font-size:25px">{{articleInfo.articleTitle}}</div>
                        <div>{{articleInfo.articleContent}}</div>
                        <el-image
                        style="width: 200px; height: 200px"
                        :src="articleInfo.articleFile"
                        :fit="'fit'"></el-image>
                    </div>
                    <div class="date">
                        <el-button  @click="showinput()" type="text">回复</el-button>
                        <div>评论数：{{articleInfo.articleCommentCount}}</div>
                        <div>浏览量：{{articleInfo.articlePageView}}</div>
                        <div>发布时间：{{articleInfo.articleCreateTime|dateFormart}}</div>
                    </div>
                </div>
            </el-col>
        </el-row>
        <!-- 分割线 -->
        <el-divider><i class="el-icon-chat-line-round"></i></el-divider>
        <!-- 回复信息 -->
        <div style="margin-top:50px;text-align:center" v-if="articleInfo.commentList.length==0">
              暂无回复
        </div>
        <div v-else v-for="item in articleInfo.commentList" :key="item.commentId">
        <el-row  type='flex' justify="start" align='middle'>
            <el-col :span="24">
                <div class="articleInfo-container">
                    <div class="head">
                        <div style="font-size:12px;color:#5f5e5e;">{{item.user.userName}}</div>
                        <el-avatar fit='cover' shape="circle" :size="50" :src="item.user.userHeadPortrait"></el-avatar>
                    </div>
                    <div class="comment-content-box">
                        {{item.commentContent}}
                    </div>
                    <div class="date">
                        <el-button @click="showinput(item.commentId)" type="text">回复</el-button>
                        <div>发布时间：{{item.commentCreateTime|dateFormart}}</div>
                    </div>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col  :span="23" :offset="1">
                <el-collapse v-if="item.commentChildList.length>0" >
                        <el-collapse-item :title="'已有'+item.commentChildList.length+'条回复'" name="1">
                            <div v-for="item2 in item.commentChildList" :key="item2.commentId" class="articleInfo-container">
                                <div class="head">
                                    <div style="font-size:12px;color:#5f5e5e;">{{item2.user.userName}}</div>
                                    <el-avatar fit='cover' shape="circle" :size="50" :src="item2.user.userHeadPortrait"></el-avatar>
                                </div>
                                <div class="comment-content-box">
                                    {{item2.commentContent}}
                                </div>
                                <div class="date">
                                    <div>发布时间：{{item2.commentCreateTime|dateFormart}}</div>
                                </div>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
            </el-col>
        </el-row>
        </div>
        <el-drawer
            size="20%"
            title="请输入内容"
            :visible.sync="drawer"
            :direction="'btt'"
            :before-close="handleClose">
            <el-row>
                <el-col  :span="15" :offset="1">
                    <el-input @keydown.ctrl.enter.native="createComment" placeholder="请输入内容,ctrl+enter发送" v-model="comment.commentContent" class="input-with-select">
                        <el-button @click="createComment" slot="append" icon="el-icon-position"></el-button>
                    </el-input>
                </el-col>
            </el-row>
        </el-drawer>
      </el-main>
  </el-container>
</template>

<script>
export default {
    data() {
        return {
            drawer: false,
            articleId:'',
            articleInfo:{
                articleId:'',
                articleTitle:'',
                articleContent:'',
                articleCreateTime:'',
                articleFile:'',
                articlePageView:'',
                articleState:'',
                articleCommentCount:'',
                articleType:'',
                commentList:[],
                user:{
                    userId:'',
                    userName:'',
                    userHeadPortrait:''
                }
            },
            comment:{
                commentContent:'',
                user:{
                    userId:''
                },
                commentParent:'',
                article:{
                    articleId:''
                }
            }
        }
    },
    methods: {
    createComment(){
        this.axios.post("/comment",this.comment)
        .then((res)=>{
            if(res.data.status == 0){
                this.$message.success(res.data.msg)
                this.getArticleDetails(this.articleId)
                this.drawer = false
            }
            else{
                this.$message.error(res.data.msg)
            }
        })
        .catch((res)=>{
            this.$message.warning("请求评论失败")
        })
    },
    handleClose(done) {
        this.comment.commentContent = '',
        done();
    },
    showinput(parentId=null){
        this.comment.commentParent = parentId;
        this.comment.user.userId = JSON.parse(sessionStorage.getItem("userInfo")).userId;
        this.comment.article.articleId = this.articleId;
        this.drawer = true;
    },
    goBack() {
        console.log('go back');
        this.$router.back(-1)
    },
    getArticleDetails(articleId){
        this.axios.get('/article/'+articleId)
        .then((res)=>{
            if(res.data.status == 0){
                this.articleInfo = res.data.data.article
            }
            else{
                this.$message.error("请求文章详情失败")
            }
        })
        .catch((res)=>{
            this.$message.warning("请求文章详情失败")
        })
        }
    },
    created() {
        this.articleId = sessionStorage.getItem("articleDetailsId")
        this.getArticleDetails(this.articleId)
    },
}
</script>

<style scoped>
    .articleInfo-container{
        padding-top:10px;
        padding-bottom:10px;
        padding-left:10px;
        padding-right:10px;
        display: flex;
        flex-direction: row;
        justify-content: start;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        
    }
    .head{
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: center;
    }
    .content-box{
        flex: 16;
        background-color: #eeeeeed8;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding:8px;
    }
    .comment-content-box{
        flex: 16;
        background-color: #eeeeeed8;
        padding:8px;
        font-size: 13px;
        width: auto;
        white-space:normal; 
        word-break:break-all;
        overflow:hidden;
    }
    .date{
        flex: 3;
        font-size: 8px;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: flex-end;
    }
</style>