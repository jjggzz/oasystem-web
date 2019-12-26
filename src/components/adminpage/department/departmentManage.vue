<template>
    <el-container direction="vertical">
      <el-header>
        <el-button  type="success" @click="addDepFormVisible = true">添加部门</el-button>
      </el-header>
      <el-main style="padding:0px">
        <!-- 添加部门对话框 -->
        <el-dialog title="添加部门" :visible.sync="addDepFormVisible" width="30%" center>
          <div class="add-dep-from">
          <el-form :label-position="'top'" :model="addDepForm" ref="addDepForm" :rules="addDepFormRules"> 
             <el-form-item label="部门级别" prop="departmentLevel">
               <el-select v-model="addDepForm.departmentLevel" placeholder="请选择">
                 <el-option key="1" :value=1 :label="'一级部门'"></el-option>
                 <el-option key="2" :value=2 :label="'二级部门'"></el-option>
                 <el-option key="3" :value=3 :label="'三级部门'"></el-option>
                 <el-option key="4" :value=4 :label="'四级部门'"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="departmentParent.departmentId" v-if="addDepForm.departmentLevel!=1" label="父部门">
                <el-select v-model="addDepForm.departmentParent.departmentId" clearable placeholder="请选择">
                  <el-option
                    v-for="item in parentDepList"
                    :key="item.departmentId"
                    :label="item.departmentParent==null?item.departmentName:item.departmentParent.departmentName+'/'+item.departmentName"
                    :value="item.departmentId">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="部门名" prop="departmentName">
                <el-input v-model="addDepForm.departmentName" placeholder="请输入部门名"></el-input>
              </el-form-item>
          </el-form>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="clearAddDepForm">取 消</el-button>
            <el-button type="primary" @click="addDepartement('addDepForm')">确 定</el-button>
          </div>
        </el-dialog>
          <!-- 表格区域 -->
        <el-table
          :data="showDepartmentList"
          style="width: 100%"
          height="540">
          <el-table-column
          type="index"
          label="序号">
          </el-table-column>
          <el-table-column
          prop="departmentName"
          label="部门名">
          </el-table-column>
          <el-table-column
          prop="departmentNumber"
          label="部门人数">
          </el-table-column>
          <el-table-column
          label="父部门">
          <template slot-scope="scope">
            {{scope.row.departmentParent==null?"无":scope.row.departmentParent.departmentName}}
          </template>
          </el-table-column>
          <el-table-column
          prop="departmentLevel"
          label="部门级别">
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
            <el-button size="mini" type="primary" plain>详情</el-button>
            <el-button size="mini" type="warning"@click="updateDep(scope.$index, scope.row)" plain>更名</el-button>
            <el-button size="mini" type="danger" @click="deleteDep(scope.$index, scope.row)" plain>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    </el-container>
</template>

<script>
  export default {
    watch:{
      'addDepForm.departmentLevel':function(){
          //级别发生变化
          this.addDepForm.departmentParent.departmentId = null
      }
    },
    computed:{
      parentDepList:function(){
        return this.departmentList.filter((item)=>{
          if(item.departmentLevel == this.addDepForm.departmentLevel-1){
            return item
          }
        })
      },
      showDepartmentList:function(){
        return this.departmentList.filter((item)=>{
          if(item.departmentName.includes(this.search)||
          (item.departmentParent!=null && item.departmentParent.departmentName.includes(this.search))){
            return item
          }
          
        })
      }
    },
    data() {
      return {
        addDepForm:{
          departmentLevel:1,
          departmentParent:{
            departmentId:null
          },
          departmentName:''
        },
        addDepFormRules:{
          departmentLevel:[
            {required: true, message: '部门级别必选', trigger: 'blur'}
          ],
          departmentName:[
             { required: true, message: '部门名不能为空', trigger: 'blur' }
          ],
          departmentParent:{
            departmentId:[
              { required: true, message: '父部门必选', trigger: 'blur' }
            ]
          }
        },
        addDepFormVisible:false,
        search: '',
        departmentList:[]
      }
    },
    methods: {
      //修改部门
      updateDep(index,row){
        this.$prompt('请输入新的部门名', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          this.axios.put("/department/"+row.departmentId,{departmentName:value})
          .then((res)=>{
            if(res.data.status == 0){
              this.$message({
                type: 'success',
                message: res.data.msg
              });  
              this.getDepartmentList()  
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
              message: '请求修改失败'
            });    
          })



        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
      },
      //删除部门
      deleteDep(index,row){
        //确认删除？
        this.$confirm('执行此操作后将删除该部门，删除后其子部门变为被删部门父部门的子部门并自动上升一级', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            //发起删除请求
            this.axios.delete("/department/"+row.departmentId)
            .then((res)=>{
                //消息提示
                if(res.data.status == 0){
                  this.$message({
                    type: 'success',
                    message: res.data.msg
                  }); 
                  //更新列表
                  this.getDepartmentList()
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
                message: '请求删除部门失败'
              });  
            })
            
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });          
          });
      },
      //清空添加部门的表单
      clearAddDepForm(){
        this.addDepForm.departmentLevel = 1
        this.addDepForm.departmentParent.departmentId = null
        this.addDepForm.departmentName = ''
        this.addDepFormVisible = false
      },
      //添加部门
      addDepartement(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.axios.post("/department/add",this.addDepForm)
            .then((res)=>{
              console.log(res)
              if(res.data.status == 0){
                this.departmentList.push(res.data.data.newDepartment)
                this.$message({
                  type: 'success',
                  message: res.data.msg
                }); 
              }
              else{
                this.$message({
                  type: 'error',
                  message: res.data.msg
                }); 
              }

              this.clearAddDepForm()
            })
            .catch((res)=>{
              this.$message({
                  type: 'error',
                  message: "请求添加部门失败"
                }); 
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
        
      },
      //获取部门列表
      getDepartmentList(){
        this.axios.get("/department/departmentList")
        .then((res)=>{
          console.log(res)
          if(res.data.status == 0){
            this.departmentList = res.data.data.departmentList
            this.$message({
              type: 'success',
              message: res.data.msg
            }); 
          }
          else{
            this.$message({
              type: 'warning',
              message: res.data.msg
            }); 
          }
        })
        .catch((res)=>{
           this.$message({
            type: 'warning',
            message: "请求部门列表失败"
          }); 
        })
      }
    },
    created() {
      this.getDepartmentList()
    },
  }
</script>

<style scoped>
.add-dep-from{
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
  .right{
    position: absolute;
    right: 20px;
  }
</style>