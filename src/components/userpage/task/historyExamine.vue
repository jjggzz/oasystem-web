<template>
  <el-container>
      <el-main>
        <el-table
          :data="examineList"
          style="width: 100%">
          <el-table-column
            label="序号"
            type="index">
          </el-table-column>
          <el-table-column
            label="所属流程"
            prop="apply.flow.flowName">
          </el-table-column>
          <el-table-column
            label="节点"
            prop="flowNode.flowNodeName">
          </el-table-column>
          <el-table-column
            label="审批人">
            <template slot-scope="scope">
                {{scope.row.userName==''?scope.row.user.userName:scope.row.userName}}
            </template>
          </el-table-column>
          <el-table-column
            label="审批意见"
            prop="examineInfo">
          </el-table-column>
          <el-table-column
            label="审批结果">
            <template slot-scope="scope">
              <el-tag :type="scope.row.examineStatus?'success':'danger'" >
                {{scope.row.examineStatus?'通过':'未通过'}}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="操作时间">
            <template slot-scope="scope">
              {{scope.row.examineDate|dateFormart}}
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
                @click="detailsApply(scope.$index, scope.row)">任务详情</el-button>
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
              任务状态：<el-tag >进行中</el-tag>
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
  data() {
    return {
      dialogVisible: false,
      examineList:[],
      applyInfo:null,
      search:''
    }
  },
  methods: {
     //任务详情
    detailsApply(index, row) {
      this.axios.get("/apply/"+row.apply.applyId)
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
    getlist(){
      var info = JSON.parse(sessionStorage.getItem('userInfo'));
      this.axios.get('/examineList/'+info.userId)
      .then((res)=>{
        console.log(res)
        if(res.data.status == 0){
          this.examineList = res.data.data.examineList;
        }
        else{
          this.$message.error(res.data.msg)
        }
      })
      .catch((res)=>{
        console.log(res)
      })
    }
  },
  created() {
    this.getlist()
  },
}
</script>

<style>

</style>