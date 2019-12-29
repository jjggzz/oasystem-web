<template>
  <el-container>
    <el-header>
      <h1 style="text-align:center">发送通知</h1>
    </el-header>
      <el-main style="margin-top:50px">
        <el-row>
          <el-col :span="14" :offset="4">
            <el-form :model="noticeForm" :rules="rules" ref="noticeForm" label-width="100px" >
              <el-form-item label="通知标题" prop="noticeTitle">
                <el-input v-model="noticeForm.noticeTitle"></el-input>
              </el-form-item>
              <el-form-item label="通知描述" prop="noticeDescription">
                <el-input 
                type="textarea" 
                :autosize="{ minRows: 7, maxRows: 7}" 
                v-model="noticeForm.noticeDescription"
                placeholder="请输入通知描述">
                </el-input>
              </el-form-item>
              <el-form-item label="文件上传" >
              <el-upload
              ref="upload"
              :with-credentials=true
              :data='noticeForm'
              action="http://localhost:8081/oasystem/noticeFile"
              :limit='1'
              :on-change='onChange'
              :before-remove='beforeRemove'
              :on-success='onSuccess'
              :auto-upload="false">
              <el-button slot="trigger" size="small" type="primary">选取文件，只能上传一个文件</el-button>
            </el-upload>
              </el-form-item>
              <el-form-item class="center-btn">
                <el-button type="primary" @click="submitForm('noticeForm')">立即发送</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      fileList:[],
      noticeForm: {
          noticeTitle: '',
          noticeDescription: '',
        },
        rules: {
          noticeTitle: [
            { required: true, message: '请输入通知标题', trigger: 'blur' }
          ],
          noticeDescription: [
            { required: true, message: '请填写通知描述', trigger: 'blur' }
          ]
        }
    }
  },
  methods: {
    //文件上传成功时触发的方法
    onSuccess(response, file, fileList){
      console.log(response)
      if(response.status == 0){
        this.$message({
          type:'success',
          message:response.msg
        })
      }
      else{
        this.$message({
          type:'error',
          message:"发送失败"
        })
      }
    },
    //文件改变时触发
    onChange(file,fileList){
      this.fileList = fileList;
    },
    //文件移除时触发
    beforeRemove(file, fileList){
       this.fileList = fileList;
    },
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //如果文件列表不为空，直接调用上传文件方法
            if(this.fileList.length != 0){
              this.$refs.upload.submit()
            }
            else{
              //否则手动调用发送通知的方法
              this.axios.post("/notice",this.noticeForm)
              .then((res)=>{
                if(res.data.status == 0){
                  this.$message({
                    type:'success',
                    message:res.data.msg
                  })
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
                    message:"请求发送通知失败"
                  })
              })
            }

          } else {
            console.log('error submit!!');
            return false;
          }
        });
    }
  }
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