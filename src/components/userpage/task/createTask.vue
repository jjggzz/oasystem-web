<template>
  <el-container>
    <el-main>
      <el-row >
        <el-col :span="12" :offset="5">
          <h1>创建任务</h1>
          <el-form ref="applyForm" :rules="rules" :model="applyForm" label-width="80px">
            <el-form-item label="申请标题" prop="applyTitle">
              <el-input v-model="applyForm.applyTitle" placeholder="请输入申请标题"></el-input>
            </el-form-item>
            <el-form-item label="申请流程" prop="flowId">
              <el-select v-model="applyForm.flowId" placeholder="请选择申请的流程">
                <el-option
                  v-for="item in showFlowList"
                  :key="item.flowId"
                  :label="item.flowName"
                  :value="item.flowId">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="申请描述" prop="applyDescription">
              <el-input type="textarea" 
              v-model="applyForm.applyDescription" 
              :autosize="{ minRows: 7, maxRows: 7}"  
              placeholder="请输入申请描述" ></el-input>
            </el-form-item>
            <el-form-item label="文件上传" >
              <el-upload
              ref="upload"
              :with-credentials=true
              :data='applyForm'
              action="http://192.168.1.102/oasystem/apply"
              :limit='1'
              :auto-upload="false"
              :on-change="onChange"
              :on-remove="onRemove"
              :on-success="onSuccess"
              :on-exceed="handleExceed">
              <el-button slot="trigger" size="small" type="success">只能上传一个文件</el-button>
            </el-upload>
              </el-form-item>
            <el-form-item class="center-btn">
              <el-button type="primary" @click="onSubmit('applyForm')">立即创建</el-button>
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
    showFlowList:function(){
      return this.flowList.filter((item)=>{
        if(item.flowState==1){
          return item
        }
      })
    }
  },
  data() {
    return {
      flowList:[],
      flag:false,
      applyForm: {
          applyTitle: '',
          flowId:'',
          applyDescription: ''
        },
      rules:{
        applyTitle:[
          { required: true, message: '请输入申请标题', trigger: 'blur' },
        ],
        flowId:[
          { required: true, message: '请选择申请的流程', trigger: 'blur' },
        ],
        applyDescription:[
          { required: true, message: '请输入申请描述', trigger: 'blur' }
        ]
      }
    }
  }, 
  methods: {
    onSuccess(response, file, fileList){
      if(response.status === '0'){
        this.$message.success(response.msg)
        this.$router.push({path:'/userHome/task/myBacklog'})
      }
      else{
        this.$message.error(response.msg)
      }
    },
      onSubmit(formName) {
         this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.flag){
              this.$refs.upload.submit();
            }
            else{
              this.$message.warning('请选择文件');
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
       handleExceed(files, fileList) {
        this.$message.warning('只允许上传一个文件');
      },
     onChange(file, fileList){
       if(fileList.length>0)
       {
         this.flag = true
       }
       else{
         this.flag = false
       }
     },
     onRemove(file, fileList){
        this.flag = false 
     },
     getFlowList(){
       this.axios.get('/flow/flowList')
       .then((res)=>{
          console.log(res)
          this.flowList = res.data.data.flowList;
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
  .center-btn{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>