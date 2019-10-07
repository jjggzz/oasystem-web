<template>
  <div class="createdep-container">
      <div style="width:100%;">
        <ol class="breadcrumb">
            <li>组织</li>
            <li>创建部门</li>
        </ol>
     </div>
    <ol>
      <li>输入部门名和部门描述即可创建部门</li>
      <li>添加成员到新建部门请到<strong>部门管理</strong></li>
      <li>设置成员职位请到<strong>职位管理</strong></li>
    </ol>
     <div class="createdep">
         <h1 class="text-center">创建部门</h1>
          <form class="form-horizontal">
              <div class="form-group">
                  <label for="depName" class="col-sm-2 control-label">部门名</label>
                  <div class="col-sm-8">
                      <input type="text" class="form-control" id="depName" placeholder="请输入部门名">
                  </div>
              </div>
              <div class="form-group">
                  <label for="depDescribe" class="col-sm-2 control-label">部门描述</label>
                  <div class="col-sm-8">
                      <textarea class="form-control" id="depDescribe" placeholder="请输入部门描述" ></textarea>
                  </div>
              </div>
               <div class="form-group">
                    <div class="col-sm-offset-2 col-sm-10">
                    <button class="btn btn-success" >创建</button>
                    </div>
                </div>
          </form>
     </div>

  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.createdep-container{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 5px;
    background-color: #fff;
  }
 .createdep{
    width: 70%;
    border-radius: 5px;
    border: 1px solid #2d2d2d2d;
    padding: 2%;
 }
</style>