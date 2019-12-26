<template>
  <el-container>
      <el-header>
        <el-button  type="success" @click="toAddFlow">添加流程</el-button>
      </el-header>
      <el-main>
        <el-table
            :data="showList"
            style="width: 100%"
            height="540">
             <el-table-column type="expand">
            <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="流程名">
                    <span>{{ props.row.flowName }}</span>
                </el-form-item>
                <el-form-item label="流程描述">
                    <span>{{ props.row.flowDescription }}</span>
                </el-form-item>
                <el-form-item label="流程状态">
                    <span>{{ props.row.flowState ==0 ? '未启用':'已启用' }}</span>
                </el-form-item>
                <el-form-item label="流程">
                    <span v-for="item in props.row.flowNodeList" :key="item.flowNodeId">
                        {{ item.flowNodeName }}-
                    </span>
                </el-form-item>
                </el-form>
            </template>
            </el-table-column>
            <el-table-column
            label="序号"
            type="index">
            </el-table-column>
            <el-table-column
            label="流程名"
            prop="flowName">
            </el-table-column>
            <el-table-column
            label="流程描述"
            prop="flowDescription">
            </el-table-column>
            <el-table-column
            label="流程状态"
            :filters="[{ text: '未启用', value: 0 }, { text: '已启用', value: 1 }]"
            :filter-method="filterFlowState">
            <template slot-scope="scope">
                <el-tag :type="scope.row.flowState == 0? 'warning':'success'">
                    {{scope.row.flowState == 0? '未启用':'已启用'}}
                </el-tag>
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
                type="success"
                @click="startFlow(scope.$index, scope.row)">启用</el-button>
                <el-button
                size="mini"
                plain
                type="warning"
                @click="disabledFlow(scope.$index, scope.row)">禁用</el-button>
                <el-button
                size="mini"
                type="danger"
                plain
                @click="deleteFlow(scope.$index, scope.row)">删除</el-button>
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
            return this.flowList.filter((item)=>{
                    if(item.flowName.includes(this.search)||item.flowDescription.includes(this.search)){
                        return item
                    }
                })
        }
    },
    data(){
        return {
            search: '',
            flowList:[]
        }
    },
    methods: {
        toAddFlow(){
            this.$router.push({path:'/adminHome/addFlow'})
        },
        deleteFlow(index,row){
            //是否禁用
            this.$confirm('此操作将删除该流程，此操作不可撤销', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'error'
            }).then(() => {
                this.axios.delete("/flow/"+row.flowId)
                .then((res)=>{
                    if(res.data.status == 0){
                        this.$message({
                            type: 'success',
                            message: res.data.msg
                        });  
                        this.getFlowList()
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
                        message: "请求删除流程失败"
                    });    
                })

            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                });          
            });
        },
        //启用流程
        startFlow(index, row){
            if(row.flowState == 1){
                this.$message({
                    type: 'warning',
                    message: "此流程处于启用状态"
                });  
                return
            }
            //是否禁用
            this.$confirm('此操作将启用该流程，启用此流程将能申请！', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'success'
            }).then(() => {
                this.axios.put("/flow/"+row.flowId,{flowState:1})
                .then((res)=>{
                    if(res.data.status == 0){
                        this.$message({
                            type: 'success',
                            message: res.data.msg
                        });  
                        this.getFlowList()
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
                        message: "请求启用流程失败"
                    });    
                })

            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                });          
            });
        },
        //禁用流程
        disabledFlow(index, row){
            if(row.flowState == 0){
                this.$message({
                    type: 'warning',
                    message: "此流程处于禁用状态"
                });  
                return
            }
            //是否禁用
            this.$confirm('此操作将禁用该流程，禁用后无法申请此流程！', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.axios.put("/flow/"+row.flowId,{flowState:0})
                .then((res)=>{
                    if(res.data.status == 0){
                        this.$message({
                            type: 'success',
                            message: res.data.msg
                        });  
                        this.getFlowList()
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
                        message: "请求禁用流程失败"
                    });    
                })

            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                });          
            });
        },
        filterFlowState(value, row){
            return row.flowState === value;
        },
        handleEdit(index, row) {
            console.log(index, row);
        },
        handleDelete(index, row) {
            console.log(index, row);
        },
        //获取流程列表
        getFlowList(){
            this.axios.get("/flow/flowList")
            .then((res)=>{
                console.log(res)
                this.flowList = res.data.data.flowList
            })
            .catch((res)=>{


            })
        }
    },
    created() {
        this.getFlowList()
    },
}
</script>

<style scoped>
    .step{
        padding: 20px;
    }
    .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>