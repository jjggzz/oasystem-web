<template>
  <el-container>
      <el-main>
          <el-row :gutter="20">
            <el-col :span="16">
            <el-form ref="sendNoticeForm" :rules="rules" :model="form" label-width="80px">
                <el-form-item label="通知标题" prop="title">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item label="通知级别" prop="level">
                    <el-select v-model="form.level" placeholder="请选择级别">
                    <el-option label="部门级" value="0"></el-option>
                    <el-option label="组织级" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="文件上传">
                    <el-upload
                    class="upload-demo"
                    ref="upload"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :data="updata"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :on-success="handleSuccess"
                    :on-error="handleError"
                    :file-list="fileList"
                    :auto-upload="false">
                    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                    <div slot="tip" class="el-upload__tip">文件大小不能超过5M</div>
                    </el-upload>
                </el-form-item>
                <el-form-item label="通知内容" prop="content">
                    <el-input type="textarea" v-model="form.content"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit('sendNoticeForm')">发送</el-button>
                </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="8">
                <ol>
                    <li>输入通知标题</li>
                    <li>选择通知级别</li>
                    <li>输入通知内容</li>
                    <li>当内容过多或有文件时请上传文件</li>
                </ol>
            </el-col>
        </el-row>
      </el-main>
  </el-container>
</template>

<script>
export default {
    data() {
        return {
            form: {
                title: '',
                level: '',
                content: ''
            },
            fileList:[],
            rules:{
                title: [
                    {required: true, message: '标题不可为空', trigger: 'blur'}
                ],
                level: [
                    {required: true, message: '级别不可为空', trigger: 'blur'}
                ],
                content:[
                    {required: true, message: '内容不可为空', trigger: 'blur'}
                ]
            }
        }
    },
    computed: {
        updata:function(){
            return {
                body:JSON.stringify(this.form)
            }
        }
    },
    methods: {
      onSubmit(fromName) {
          this.$refs[fromName].validate((valid) =>{
              if(valid){
                  //提交文件
                  this.$refs.upload.submit();
                  console.log('submit!');
              }
              else{
                  return false;
              }
          })

      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleSuccess(response,file,fileList){
        this.$notify({
          title: '成功',
          message: '发送成功',
          type: 'success'
        });
      },
      handleError(err, file, fileList){
          this.$notify.error({
          title: '错误',
          message: '这是一条错误的提示消息'
        });
      }
    },
}
</script>

<style>

</style>