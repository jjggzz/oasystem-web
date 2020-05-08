<template>
  <el-container>
      <el-main style="height:600px;padding:0px">
        <el-row type='flex' justify='center'>
          <el-col :span="7" >
            <el-upload
              class="upload-demo"
              drag
              :on-success='onSuccess'
              :before-upload='beforUpload'
              :with-credentials=true
              action="http://www.98guangzheng.xyz:8080/oasystem/userFile"
              multiple>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">文件大小不能超过10MB</div>
            </el-upload>
          </el-col>
        </el-row>
        
      </el-main>
  </el-container>
</template>

<script>
export default {
  methods: {
    onSuccess(response, file, fileList){
      if(response.status !== "0"){
        this.$message({
           type:"error",
           message:response.msg
         })
      }
    },
    beforUpload(file){
       if(file.size>1024*1024*10){
         this.$message({
           type:"warning",
           message:'文件超过大小'
         })
         return false;
       }
    }
  },
}
</script>

<style>

</style>