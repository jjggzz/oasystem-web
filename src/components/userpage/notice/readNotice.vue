<template>
  <el-container>
      <el-main style="height:600px;padding:0px">
        <el-row  type='flex' justify='space-between'>
          <el-col :span="6">
            <el-button type="info" @click="getNoticeList" icon="el-icon-refresh" size="small">重新载入</el-button>
          </el-col>
          <el-col :span="7">
             <el-input size="small" placeholder="请输入标题" v-model="search" class="input-with-select">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </el-col>
        </el-row>
        
        <ul  v-infinite-scroll="load" style="overflow:auto;list-style:none">
              <li v-for="(item, index) in showlist" :key="index" @click="showDialog(item.noticeId)">
                <el-card :body-style="{ padding: '15px' }"  shadow="hover">
                  <div class="item">
                  <div>
                    <p>{{item.noticeTitle}}</p>
                    <p class="item-description">{{item.noticeDescription}}</p>
                  </div>
                  <div class="item-date">
                    <p class="text">发送时间：{{item.noticeSendTime | dateFormart}}</p>
                  </div>
                </div>
              </el-card>
            </li>
        </ul>
        <el-dialog
          title="通知详情"
          :visible.sync="centerDialogVisible"
          width="45%"
          center
          :before-close="handleClose">
          <div v-loading="false" >
            <el-card class="box-card">
                <div  class="text show-item">
                  <i class="el-icon-user"></i>发送人：{{noticeInfo.user.userName}}
                </div>
                <div  class="text show-item">
                  <i class="el-icon-date"></i>发送时间：{{noticeInfo.noticeSendTime | dateFormart}}
                </div>
                <div  class="text show-item">
                  <i class="el-icon-collection-tag"></i>标题：{{noticeInfo.noticeTitle}}
                </div>
                <div  class="text show-item">
                  <i class="el-icon-notebook-1"></i>通知描述：{{noticeInfo.noticeDescription}}
                </div>
                <div  class="text show-item">
                  <i class="el-icon-document"></i>文件列表：{{noticeInfo.noticeFileList.length}}个文件
                  <ul style="overflow:auto;list-style:none">
                    <li v-for="(item, index) in noticeInfo.noticeFileList" :key="index">
                        <span class="file-item">文件名：{{item.fileName}} </span>
                        <span class="file-item">文件大小：{{Math.round(item.fileSize/1024)}} K</span>
                        <el-button icon="el-icon-download" @click="downloadNoticeFile(item.fileId,item.fileName)" size="mini">下载</el-button>
                    </li>
                  </ul>
                </div>
                <div  class="text show-item">
                  <i class="el-icon-reading"></i>已阅列表：{{noticeInfo.noticeReadList.length}}人
                  <ul style="overflow:auto;list-style:none">
                    <li v-for="(item, index) in noticeInfo.noticeReadList" :key="index">
                        <span class="file-item">用户名：{{item.user.userName}} </span>
                        <span class="file-item">阅读时间：{{item.readTime|dateFormart}} </span>
                    </li>
                  </ul>
                </div>             
            </el-card>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="handleClose">确 定</el-button>
          </span>
        </el-dialog>
      </el-main>
  </el-container>
</template>

<script>
export default {
  computed:{
    showlist(){
      return this.noticeList.filter((item)=>{
        if(item.noticeTitle.includes(this.search)){
          return item
        }
      })
    }
  },
  data() {
    return {
      centerDialogVisible: false,
      search:'',
      noticeList:[],
      noticeId:'',
      noticeInfo:{
        noticeId:'',
        noticeSendTime:'',
        noticeTitle:'',
        noticeDescription:'',
        noticeType:'',
        user:{
          userId:'',
          userName:''
        },
        noticeFileList:[],
        noticeReadList:[]
      }
    }
  },
  created() {
    this.getNoticeList()
  },
  methods: {
    handleClose(){
      this.centerDialogVisible = false
    },
    //下载文件
    downloadNoticeFile(fileId,fileName){
      this.axios.get("/noticeFile/download/"+fileId,{
        responseType:'blob'
      })
      .then((res)=>{
         console.log(res)
        if (window.navigator.msSaveBlob) {
          try {
          const blobObject = new Blob([res.data]);
          window.navigator.msSaveBlob(blobObject, fileName);
          } catch (e) {
            console.log(e);
          }
      } else {
          const blob = res.data;
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onload = (e) => {
          const a = document.createElement('a');
          a.download = fileName;
          a.href = e.target.result;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          }
      }
      })
      .catch((res)=>{

      })
    },
    load () {

    },
    showDialog(noticeId){
      this.noticeId = noticeId;
      this.centerDialogVisible = true
      this.axios.get('/notice/'+this.noticeId)
      .then((res)=>{
        console.log(res)
        if(res.data.status == 0){
          this.noticeInfo = res.data.data.notice
        }
        else{
          this.$message({
            type:'error',
            message:res.data.msg
          })
        }

      })
      .catch((res)=>{
         this.$message({
            type:'warning',
            message:"请求获取通知详细信息失败"
          })
      })
    },
    //获取已读通知列表
    getNoticeList(){
      var info = JSON.parse(sessionStorage.getItem("userInfo"))
      this.axios.get('/notice/readNoticeList/'+info.userId)
      .then((res)=>{
        if(res.data.status == 0){
          this.noticeList = res.data.data.noticeList
        }
      })
      .catch((res)=>{
         this.$message({
            type:'warning',
            message:"请求获取通知列表失败"
          })
      })
    }
  },
}
</script>

<style scoped>
  .file-item{
    margin-left: 5px;
    margin-right: 5px
  }
  .show-item{
    margin-bottom: 18px;
  }
  .item{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .item-description{
    font-size: 12px;
    color: #797878;
  }
  .text{
    font-size: 12px;
    color: #5b5b5b;
  }
  .item-date{
     display: flex;
    flex-direction:column;
    justify-content: flex-end;
  }
  p{
    margin: 7px 0px;
  }
</style>