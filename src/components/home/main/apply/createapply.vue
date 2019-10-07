<template>
 <div class="createapply-container">
     <div style="width:100%;">
          <ol class="breadcrumb">
              <li>审批</li>
              <li>发起审批</li>
          </ol>
      </div>

      <div class="createapply">
          <h1 class="text-center">发起审批</h1>
           <form class="form-horizontal">
              <div class="form-group">
                <label for="exTitle" class="col-sm-2 control-label">申请标题</label>
                <div class="col-sm-8">
                  <input type="text"  class="form-control" id="exTitle" placeholder="申请的标题" >
                </div>
              </div>
              <div class="form-group">
                <label for="exTitle" class="col-sm-2 control-label">提交至</label>
                <div class="col-sm-8">
                  <select  class="form-control">
                    <option value="1">信息工程学院</option>
                    <option value="2">土建学院</option>
                  </select>
                </div>
              </div>
              <div class="form-group">
                <label for="exDescription" class="col-sm-2 control-label">申请描述</label>
                <div class="col-sm-8">
                  <textarea class="form-control" id="exDescription"></textarea>
                </div>
              </div>
              <div class="form-group">
                <label  class="col-sm-2 control-label">文件</label>
                <div class="col-sm-8">
                  <input type="file">
                </div>
              </div>
               <div class="form-group">
                <div class="col-sm-offset-2 col-sm-10">
                  <button class="btn btn-success" @click="save">提交</button>
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
      console.log("申请提交")
    }
  },
}
</script>

<style scoped>
  .createapply-container{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 5px;
    background-color: #fff;
  }
  .createapply{
    width: 70%;
    border-radius: 5px;
    border: 1px solid #2d2d2d2d;
    padding: 2%;
  }

</style>