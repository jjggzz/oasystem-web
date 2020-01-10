<template>
  <el-container>
      <el-main style="height:600px;padding:0px">
        <el-row  type='flex' justify='space-between'>
          <el-col :span="6">
            <el-button type="info" @click="getUserFileList" icon="el-icon-refresh" size="small">重新载入</el-button>
          </el-col>
        </el-row>
        <el-table
          :data="showList"
          style="width: 100%"
          :default-sort = "{prop: 'uploadTime', order: 'descending'}">
          <el-table-column
            label="序号"
            type="index">
          </el-table-column>
          <el-table-column
            label="文件名"
            prop="fileName">
          </el-table-column>
          <el-table-column
            label="上传时间"
            sortable
            prop="uploadTime">
            <template slot-scope="scope">
              {{scope.row.uploadTime|dateFormart}}
            </template>
          </el-table-column>
          <el-table-column
            label="文件大小"
            sortable
            prop="fileSize">
            <template slot-scope="scope">
              {{Math.round(scope.row.fileSize/1024)}}k
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
                plain
                type="primary"
                @click="downloadFile(scope.$index, scope.row)">下载</el-button>
              <el-button
                size="mini"
                type="danger"
                plain
                @click="delFile(scope.$index, scope.row)">删除</el-button>
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
      return this.userFileList.filter((item)=>{
        if(item.fileName.includes(this.search)){
          return item
        }
      })
    }
  },
  data() {
    return {
      userFileList: [],
      search: ''
    }
  },
  methods: {
    //下载文件
    downloadUserFile(fileId,fileName){
      this.axios.get("/userFile/download/"+fileId,{
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
    //下载文件
     downloadFile(index, row) {
       this.downloadUserFile(row.fileId,row.fileName)
    },
    //删除文件
    delFile(index, row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
         this.axios.delete('/userFile/'+row.fileId)
         .then((res)=>{
           if(res.data.status == 0){
             this.getUserFileList()
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
            message: '请求删除文件失败'
          });  
         })


        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    //加载文件列表
    getUserFileList(){
      var info = JSON.parse(sessionStorage.getItem("userInfo"))
      this.axios.get('/userFile/userFileList/'+info.userId)
      .then((res)=>{
        console.log(res)
        if(res.data.status == 0){
          this.userFileList = res.data.data.userFileList
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
            message:"请求失败"
          })
      })
    }
  },
  created() {
    this.getUserFileList()
  },
}
</script>

<style>

</style>