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
            <el-tag >已结束</el-tag>
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
                @click="detailsApply(scope.$index, scope.row)">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog
          title="任务信息"
          :visible.sync="dialogVisible"
          width="50%">
          <el-card v-if="applyInfo!=null" shadow="always">
            <div slot="header" class="clearfix">
              <span>任务信息</span>
            </div>
            <div  class="text item">
              任务标题：{{applyInfo.applyTitle}}
            </div>
            <div  class="text item">
              任务描述：{{applyInfo.applyDescription}}
            </div>
            <div  class="text item">
              任务状态：<el-tag :type="status(applyInfo.examineList)?'success':'danger'" >{{status(applyInfo.examineList)?"通过":'未通过'}}</el-tag>
            </div>
            <div  class="text item">
              任务流程：{{applyInfo.flow.flowName}}
            </div>
             <div  class="text item">
              文件列表
              <ul style="overflow:auto;list-style:none">
                <li v-for="item in applyInfo.fileList" :key="item.fileId">
                    <span class="file-item">文件名：{{item.fileName}} </span>
                    <span class="file-item">文件大小：{{Math.round( item.fileSize/1024)}} K</span>
                    <el-button type="text" @click="downloadApplyFile(item.fileId,item.fileName)">下载</el-button>
                </li>
              </ul>
            </div>
            <div  class="text item">
              审批列表
              <el-table :data="applyInfo.examineList">
                <el-table-column  type="index" label="序号"></el-table-column>
                <el-table-column property="userName" label="审批人"></el-table-column>
                <el-table-column property="examineInfo" label="审批意见" ></el-table-column>
                <el-table-column  label="审批时间">
                  <template slot-scope="scope">
                    {{scope.row.examineDate |dateFormart}}
                  </template>
                </el-table-column>
                <el-table-column label="审批结果" width="100">
                  <template slot-scope="scope">
                    <el-tag :type="scope.row.examineStatus?'success':'danger'" >
                      {{scope.row.examineStatus?'通过':'未通过'}}
                    </el-tag>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-card>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>
      </el-main>
  </el-container>
</template>

<script>
export default {
  computed: {
    showList:function(){
      return this.applyList.filter((item)=>{
        if((item.applyState==2) &&(item.applyTitle.includes(this.search)||item.flow.flowName.includes(this.search))){
          return item
        }

      })
    }
  },
  data() {
    return {
      dialogVisible: false,
      applyList: [],
      search: '',
      applyInfo:null
    }
  },
  methods: {
    status(list){
      for(var i = 0;i<list.length;i++){
        if(list[i].examineStatus==false){
          return false
        }
      }
      return true
    },
    //下载文件
    downloadApplyFile(fileId,fileName){
      this.axios.get("/applyFile/download/"+fileId,{
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
    //任务详情
    detailsApply(index, row) {
      this.axios.get("/apply/"+row.applyId)
      .then((res)=>{
        console.log(res)
        if(res.data.status == 0){
          this.applyInfo = res.data.data.apply
          this.dialogVisible = true
        }
        else{
          this.$message.error(res.data.msg)
        }
        
      })
      .catch((res)=>{

      })
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

<style scoped>
 .file-item{
    margin-left: 5px;
    margin-right: 5px
  }
</style>