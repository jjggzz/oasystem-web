<template>
  <el-container>
      <el-main>
          <!-- 职位信息 -->
          <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="50%">
            <div class="position-info" >
                <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>{{showInfo.positionName}}</span>
                </div>
                <div v-for="(o,index) in showInfo.permissionList" :key="o.permissionId" style="width:50%;display: inline-block" class="text item">
                        {{'权限'+(index+1)+'：' + o.permissionName }}
                </div>
                </el-card>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
          </el-dialog>
          <!-- 修改职位 -->
          <el-dialog title="修改职位" :visible.sync="dialogFormVisible">
            <el-form :model="alterForm">
                <el-form-item label="职位名称" :label-width="formLabelWidth">
                <el-input v-model="alterForm.positionName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="权限" :label-width="formLabelWidth">
                    <el-transfer
                        filterable
                        :filter-method="filterMethod"
                        filter-placeholder='请输入关键字'
                        v-model="alterForm.permissionId"
                        :data="getdata()">
                    </el-transfer>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="clearAlterPosition">取 消</el-button>
                <el-button type="primary" @click="commitAlter">确 定</el-button>
            </div>
        </el-dialog>
          <el-row :gutter="20">
            <el-col :span="12">
                <!-- 显示列表 -->
                <el-table
                    :data="showList"
                    style="width: 100%"
                    height="600">
                    <el-table-column
                    type="index"
                    label="序号">
                    </el-table-column>
                    <el-table-column
                    label="职位id"
                    prop="positionId">
                    </el-table-column>
                    <el-table-column
                    label="职位名"
                    prop="positionName">
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
                        @click="alterPosition(scope.$index, scope.row)">修改</el-button>
                        <el-button
                        size="mini"
                        type="primary"
                        plain
                        @click="infoPosition(scope.$index, scope.row)">详情</el-button>
                        <el-button
                        size="mini"
                        type="danger"
                        plain=""
                        @click="delPosition(scope.$index, scope.row)">删除</el-button>
                    </template>
                    </el-table-column>
                </el-table>
            </el-col>
            <el-col :span="12">
                <!-- 创建职位表单 -->
                <el-form   class="writer" :model="form" label-width="80px">
                    <el-form-item >
                        <p class="font">创建职位</p>
                    </el-form-item>     
                    <el-form-item label="职位名称" label-width="80px">
                        <el-input  v-model="form.positionName"></el-input>
                    </el-form-item>
                    <el-form-item label="权限">
                        <el-transfer
                            filterable
                            :filter-method="filterMethod"
                            filter-placeholder='请输入关键字'
                            v-model="form.permissionId"
                            :data="getdata()">
                        </el-transfer>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="addPosition">立即创建</el-button>
                        <el-button @click="resetAddPosition">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
      </el-main>
  </el-container>
</template>

<script>
export default {
    computed: {
        showList:function(){
            return this.positionList.filter((item)=>{
                if(item.positionName.includes(this.search)){
                    return item
                }
            })
        }
    },
    data() {
        return {
            showInfo:{
                positionId: '',
                positionName:'',
                permissionList:[]
            },
            dialogVisible:false,
            alterForm: {
                positionId:'',
                positionName:'',
                permissionId:[]
            },
            formLabelWidth: '120px',
            dialogFormVisible:false,
            form: {
                positionName: '',
                permissionId: [],
            },
            search: '',
            permissionList:[],
            positionList:[]
        }
    },
    methods: {
        infoPosition(index,row){
            this.showInfo = row

            this.dialogVisible = true
        },
        //提交修改
        commitAlter(){
            this.axios.put("/position/"+this.alterForm.positionId,this.alterForm)
            .then((res)=>{
                if(res.data.status == 0){
                     this.$message({
                        type: 'success',
                        message: res.data.msg
                    }); 
                    this.getPositionList()
                    this.clearAlterPosition()
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
                        message: "请求修改职位失败"
                    }); 
            })
        },
        clearAlterPosition(){
            this.alterForm.positionName = ''
            this.alterForm.permissionId = []
            this.dialogFormVisible = false
        },
        alterPosition(index,row){
            //设置id
            this.alterForm.positionId = row.positionId;
            //设置职位名
            this.alterForm.positionName = row.positionName;
            //设置权限列表
            row.permissionList.forEach(element => {
                this.alterForm.permissionId.push(element.permissionId)
            });
            this.dialogFormVisible = true
        },
        delPosition(index,row){
            this.$confirm('此操作将永久删除该职位, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.axios.delete("/position/"+row.positionId)
                .then((res)=>{
                    if(res.data.status == 0){
                        this.$message({
                            type: 'success',
                            message: res.data.msg
                        }); 
                        this.getPositionList()
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
                        message: "请求删除职位失败"
                    }); 
                })

            }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消删除'
            });          
            });
        },
        resetAddPosition() {
            this.form.positionName = ''
            this.form.permissionId = []
        },
        filterMethod(query, item) {
          return item.label.includes(query) 
        },
        getdata(){
            const data = [];
            for (let i = 0; i < this.permissionList.length; i++) {
            data.push({
                key: this.permissionList[i].permissionId,
                label: this.permissionList[i].permissionName
            });
            }
            return data;
        },
        getPermissionList(){
            this.axios.get("/permission/permissionList")
            .then((res)=>{
                if(res.data.status == 0){
                    this.permissionList = res.data.data.permissionList
                }
            })
            .catch((res)=>{

            })
        },
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
        addPosition() {
            this.axios.post("/position",this.form)
            .then((res)=>{
                if(res.data.status == 0){
                    this.$message({
                        type: 'success',
                        message: res.data.msg
                    }); 
                    this.getPositionList()
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
                        message: "请求添加职位失败"
                    }); 
            })
        }
    },
    created() {
        this.getPermissionList()
        this.getPositionList()
    },
}
</script>

<style scoped>
    .position-info{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
    }
    .writer{
        background-color: #fff;
        height: 600px;
    }
    .font{
        font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
        font-size: 20px;
    }
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
    width: 480px;
  }
</style>