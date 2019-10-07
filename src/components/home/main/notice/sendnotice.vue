<template>
  <div class="sendNotice-container">
      <div style="width:100%;">
          <ol class="breadcrumb">
              <li>通知</li>
              <li>发送通知</li>
          </ol>
      </div>
      <ol>
        <li>编辑通知标题,通知描述</li>
        <li>填写通知内容(当内容过长或者需要发送附件时请上传文件,文件<strong>最大为5MB</strong>)</li>
        <li>
          选择通知的级别
          <ul>
            <li>所有部门:向本组织的所有部门发送通知,<strong>所有人可见</strong></li>
            <li>当前部门:向自己所在部门发送通知,<strong>仅自己部门人员可见</strong></li>
          </ul>
        </li>
      </ol>

      <div class="sendNotice">
          <h1 class="text-center">发送通知</h1>
        <form class="form-horizontal">
          <div class="form-group">
            <label for="noTitle" class="col-sm-2 control-label">通知标题</label>
            <div class="col-sm-8">
              <input type="text"  class="form-control" id="noTitle" placeholder="通知的标题" >
            </div>
          </div>
          <div class="form-group">
            <label for="noDescribe" class="col-sm-2 control-label">通知描述</label>
            <div class="col-sm-8">
              <input type="text"  class="form-control" id="noDescribe" placeholder="通知的简述" >
            </div>
          </div>
          <div class="form-group">
            <label  class="col-sm-2 control-label">级别</label>
            <div class="col-sm-8">
                <select class="form-control" >
                    <option value="1">所有部门</option>
                    <option value="2">当前部门</option>
                </select>
            </div>
          </div>
          <div class="form-group">
            <label for="noContent" class="col-sm-2 control-label">通知内容</label>
            <div class="col-sm-8">
              <textarea class="form-control" id="noContent" placeholder="通知的内容,过长时请选择文件的形式"  ></textarea>
            </div>
          </div>
          <div class="form-group">
            <label for="noFileAddress" class="col-sm-2 control-label">文件上传</label>
            <div class="col-sm-8">
              <input type="file">
            </div>
          </div>

          <div class="form-group">
            <div class="col-sm-offset-2 col-sm-10">
              <button class="btn btn-success" @click="save">发送</button>
            </div>
          </div>
        </form>
    </div>
      
  </div>
</template>

<script>
export default {
    methods: {
        save(){
            console.log("发送")
        }
    },
}
</script>

<style scoped>
    .sendNotice-container{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: 5px;
        background-color: #fff;
    }
    .sendNotice{
      width: 70%;
      border-radius: 5px;
      border: 1px solid #2d2d2d2d;
      padding: 2%;
    }
</style>