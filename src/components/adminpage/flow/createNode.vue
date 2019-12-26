<template>
  <el-container>
        <el-main>
            <el-row :gutter="20">
                <el-col  :span="10" :offset="7">
                    <h1 class="head">创建第一步所添加流程的节点</h1>
                    <el-form ref="flowNode" :model="flowNode" :rules="flowNodeRules" label-width="100px">
                    <el-form-item label="节点名" prop="flowNodeName">
                        <el-input v-model="flowNode.flowNodeName"></el-input>
                    </el-form-item>
                    <el-form-item label="节点描述" prop="flowNodeDescription">
                        <el-input type="textarea" v-model="flowNode.flowNodeDescription"></el-input>
                    </el-form-item>
                    <el-form-item label="审批人职位" >
                        <el-select v-model="flowNode.position.positionId" clearable placeholder="请选择">
                            <el-option
                            v-for="item in positionList"
                            :key="item.positionId"
                            :label="item.positionName"
                            :value="item.positionId">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="addFlowBtn">
                        <el-button type="info" @click="prev">上一步</el-button>
                        <el-button type="primary" @click="addNodeToList('flowNode')">添加节点</el-button>
                        <el-button  @click="addNode" type="success">下一步</el-button>
                    </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="10" :offset="7">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>节点列表</span>
                        </div>
                        <div v-for="(item,index) in flowNodeList" :key="index" class="text item">
                            <el-button size="mini" @click="delNode(index)">移除</el-button>节点名：<el-tag>{{item.flowNodeName}}</el-tag>审批人职位：<el-tag>{{showPositionName(item.position.positionId)}}</el-tag>节点描述：<el-tag>{{item.flowNodeDescription}}</el-tag>
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
    },
    data() {
        return {
            positionList:[],
            flowNode: {
                flowNodeName: '',
                flowNodeDescription: '',
                position:{
                    positionId:''
                }
            },
            flowNodeRules:{
                flowNodeName:[
                    {required: true, message: '节点名必填', trigger: 'blur'}
                ],
                flowNodeDescription:[
                    {required: true, message: '节点描述必填', trigger: 'blur'}
                ]
            },
            flowNodeList:[]
        }
    },
    methods: {
        //上一步
        prev(){
            //流程到第二步
            this.$store.commit('updateCurrentSteps',1)
        },
        //将节点列表放入vuex
        addNode(){
            if(this.flowNodeList.length == 0){
                this.$message({
                    type:'warning',
                    message:"节点列表为空"
                })
                return
            }
            this.$store.commit('updateFlowNodeList',this.flowNodeList);
            //流程到第三步
            this.$store.commit('updateCurrentSteps',3)
        },
        //清除表单
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        //移除节点
        delNode(index){
            this.flowNodeList.splice(index,1)
        },
        //添加节点到节点列表
        addNodeToList(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    //如果校验通过，放入节点列表
                    var node = this.flowNode
                    this.flowNodeList.push(
                        {flowNodeName:node.flowNodeName,
                        flowNodeDescription:node.flowNodeDescription,
                        position:{
                            positionId:node.position.positionId
                        }})
                    this.resetForm(formName)
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        //显示职位名称
        showPositionName(positionId){
            for(var i = 0;i<this.positionList.length;i++){
                if(this.positionList[i].positionId == positionId){
                    return this.positionList[i].positionName
                }
            }
        },
        //获取职位列表
        getPositionList(){
            this.axios.get('/position/positionList')
            .then((res)=>{
                console.log(res)
                if(res.data.status == 0){
                    this.$message({
                        type: 'success',
                        message: res.data.msg
                    }); 
                    this.positionList = res.data.data.positionList
                    this.$store.commit('updatePositionList',this.positionList)
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
                    message: "请求职位列表失败"
                }); 
            })
        },
    },
    created() {
        this.getPositionList()
    },
}
</script>

<style scoped>
    .head{
        text-align: center
    }
    .addFlowBtn{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
    .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
    border: 1px solid #9e9e9e;
    padding: 5px;
    border-radius: 2px
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