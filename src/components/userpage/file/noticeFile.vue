<template>
  <el-container direction="vertical">
      <el-main>
        <el-table
          :data="noticeFileList"
          :default-sort = "{prop: 'notice.noticeSendTime', order: 'descending'}"
          style="width: 100%">
          <el-table-column
            label="序号"
            type="index">
          </el-table-column>
          <el-table-column
            label="通知标题"
            prop="notice.noticeTitle">
          </el-table-column>
          <el-table-column
            label="上传时间"
            sortable
            prop="notice.noticeSendTime">
            <template slot-scope="scope">
              {{scope.row.notice.noticeSendTime | dateFormart}}
            </template>
          </el-table-column>
           <el-table-column
            label="文件名"
            prop="fileName">
          </el-table-column>
           <el-table-column
            label="文件大小"
            sortable
            prop="fileSize">
             <template slot-scope="scope">
              {{Math.round( scope.row.fileSize/1024) }}k
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
                type="primary"
                plain
                @click="downloadNoticeFile(scope.$index, scope.row)">下载</el-button>
              <el-button
                size="mini"
                plain
                type="danger"
                @click="deleteNoticeFile(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      noticeFileList:[],
      search: ''
    }
  },
  methods: {
      //下载通知文件
      downloadNoticeFile(index, row) {
        this.axios.get("/noticeFile/download/"+row.fileId,{
          responseType:'blob'
        })
        .then((res)=>{
          console.log(res)
          if (window.navigator.msSaveBlob) {
            try {
            const blobObject = new Blob([res.data]);
            window.navigator.msSaveBlob(blobObject, row.fileName);
            } catch (e) {
              console.log(e);
            }
        } else {
            const blob = res.data;
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onload = (e) => {
            const a = document.createElement('a');
            a.download =  row.fileName;
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
      //删除通知文件
      deleteNoticeFile(index, row) {
       this.axios.delete('/noticeFile/'+row.fileId)
       .then((res)=>{
         if(res.data.status == 0){
          this.$message({
            type:"success",
            message:res.data.msg
          })
          //删除成功,重新加载文件
          this.getNoticeFileList()
         }
         else{
          this.$message({
            type:"error",
            message:res.data.msg
          })
         }
       })
       .catch((res)=>{
         this.$message({
           type:"warning",
           message:'请求删除文件失败'
         })
       })
      },
      //获取通知文件列表
      getNoticeFileList(){
        this.axios.get("/noticeFile/noticeFileList")
        .then((res)=>{
          console.log(res)
          if(res.data.status == 0){
            this.noticeFileList = res.data.data.noticeFileList
          }else{
            this.$message({
              type:'error',
              message:res.data.msg
            })
          }
        })
        .catch((res)=>{
           this.$message({
              type:'warning',
              message:"请求通知文件列表失败"
            })
        })
      }
  },
  created() {
    this.getNoticeFileList()
  },
}
</script>

<style>

</style>