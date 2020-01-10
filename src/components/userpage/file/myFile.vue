<template>
  <el-container direction="vertical">
      <el-main style="padding:0">
        <el-tabs style="height: 630px;" type="border-card" :tab-position="'left'">
          <el-tab-pane>
            <span slot="label"><i class="el-icon-date"></i> 上传文件</span>
            <myFileUploadFile></myFileUploadFile>
          </el-tab-pane>
          <el-tab-pane >
            <span slot="label"><i class="el-icon-date"></i> 文件管理</span>
            <myFileManage></myFileManage>  
          </el-tab-pane>
        </el-tabs>
      </el-main>
  </el-container>
</template>

<script>
import myFileManage from './myFileManage'
import myFileUploadFile from './myFileUploadFile'

export default {
  components:{
    'myFileManage':myFileManage,
    'myFileUploadFile':myFileUploadFile
  }
}
</script>

<style>

</style>