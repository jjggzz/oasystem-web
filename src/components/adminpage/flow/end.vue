<template>
  <el-container>
        <el-main>
            <el-row>
                <el-col :span="10" :offset="7">
                    <el-card class="box-card">
                 <div slot="header" class="clearfix">
                    <span>流程信息</span>
                    <el-button style="float: right; padding: 10px 10px" type="success" @click="commit">提交</el-button>
                    <el-button style="margin-right:5px; float: right; padding: 10px 10px" @click="prev" type="info">上一步</el-button>
                </div>
                <div  class="text item">
                   流程名:{{flow.flowName}}
                </div>
                 <div  class="text item">
                   流程描述:{{flow.flowDescription}}
                </div>
                <div  class="text item">
                   流程节点列表:
                </div>
                <div v-for="(item,index) in flowNodeList" :key='index' class="text item">
                    职位名：{{item.flowNodeName}}&nbsp&nbsp&nbsp 职位描述：{{item.flowNodeDescription}}&nbsp&nbsp&nbsp 审批人职位：{{showPositionName(item.position.positionId)}}
                </div>
            </el-card>
                </el-col>
            </el-row>
            
        </el-main>
    </el-container>
</template>

<script>
export default {
    data() {
        return {
            flow:this.$store.state.flow,
            flowNodeList:this.$store.state.flowNodeList,
            positionList:this.$store.state.positionList
        }
    },
    methods: {    
        //提交流程
        commit(){
            this.$confirm('确认提交?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'success'
            }).then(() => {
               //提交
               this.axios.post('/flow',{
                   flowName:this.flow.flowName,
                   flowDescription:this.flow.flowName,
                   flowNodeList:this.flowNodeList
               })
               .then((res)=>{
                  if(res.data.status == 0){
                      this.$message({
                        type: 'success',
                        message: res.data.msg
                    });  
                    this.$store.commit('updateCurrentSteps',1)
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
                        message: '请求添加流程失败'
                    });      
               })

            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消提交'
                });          
            });
        },
        prev(){
            this.$store.commit('updateCurrentSteps',3)
        },
        //显示职位名称
        showPositionName(positionId){
            for(var i = 0;i<this.positionList.length;i++){
                if(this.positionList[i].positionId == positionId){
                    return this.positionList[i].positionName
                }
            }
        },
    },
}
</script>

<style scoped>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 100%;
  }
</style>