<template>
  <el-container direction="vertical">
    <el-header>
      <el-row>
        <el-col :span="12" :offset="6">
          <p class="title">创建帖子</p>
        </el-col>
      </el-row>
    </el-header>
      <el-main>
        <el-row>
          <el-col :span="12" :offset="6">
            <el-form :label-position="'right'" :rules="rules" ref="articleForm" label-width="80px" :model="article">
          <el-form-item label="标题" prop="articleTitle">
            <el-input v-model="article.articleTitle" placeholder="请输入标题"></el-input>
          </el-form-item>
          <el-form-item label="内容" prop="articleContent">
            <el-input type="textarea"
            :show-word-limit="true"
            maxlength="500"
            :autosize='{ minRows: 4, maxRows: 4 }'
            v-model="article.articleContent"
            placeholder="请输入内容"></el-input>
          </el-form-item >
           <el-form-item label="类型" prop="articleType">
            <el-radio v-model="article.articleType" label="0">技术贴</el-radio>
            <el-radio v-model="article.articleType" label="1">灌水贴</el-radio>
          </el-form-item>
          <el-form-item class="btn" >
            <el-upload
              ref="upload"
              class="upload-demo"
              drag
              :data="article"
              action="http://192.168.1.102/oasystem/article"
              :limit="1"
              :auto-upload="false"
              :with-credentials="true"
              :on-exceed="onExceed"
              :before-upload='beforeUpload'
              :on-success='onSuccess'>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过10MB</div>
            </el-upload>
          </el-form-item>
          <el-form-item class='btn'>
            <el-button type="primary" @click="create('articleForm')" >立即创建</el-button>
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
      article: {
          articleTitle: '',
          articleContent: '',
          articleType: "0"
        },
        rules:{
          articleTitle:[
            {required: true, message: '请输入帖子标题', trigger: 'blur'}
          ],
          articleContent:[
            {required: true, message: '请输入帖子内容', trigger: 'blur'}
          ],
          articleType:[
            {required: true, message: '请选择帖子的类型', trigger: 'blur'}
          ]
        }
    }
  },
  methods: {
    onSuccess(response, file, fileList){
      if(response.status === '0'){
        this.$message.success(response.msg);
      }
      else{
        this.$message.error(response.msg);
      }
    },
    beforeUpload(file){
      const isJPG = file.type === 'image/jpeg'||file.type === 'image/png';
        const isLt10M = file.size / 1024 / 1024 < 10;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG或PNG 格式!');
        }
        if (!isLt10M) {
          this.$message.error('上传头像图片大小不能超过 10MB!');
        }
        return isJPG && isLt10M;
    },
    onExceed(files, fileList){
      this.$message({
        type:'warning',
        message:"只允许上传一张图片"
      })
    },
    create(formName){
      this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$refs.upload.submit();
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
  .title{
    text-align: center;
    font-size: 25px;
  }
  .btn{
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
</style>