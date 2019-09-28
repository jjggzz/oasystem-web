<template>
  <div class="userinfo-container">
    <div style="width:100%;">
    <ol class="breadcrumb">
        <li>用户</li>
        <li>用户信息</li>
    </ol>
    </div>
    
    <div class="user-info">
        <form class="form-horizontal">
          <div class="form-group">
            <label for="userName" class="col-sm-2 control-label">用户名</label>
            <div class="col-sm-8">
              <input type="text" v-model="user.userName" class="form-control"   @dblclick="write" id="userName"  readonly>
            </div>
            <div class="col-sm-2">
              <button class="btn btn-default" @click="writeByBtn('userName')">编辑</button>
            </div>
          </div>
          <div class="form-group">
            <label for="userLoginName" class="col-sm-2 control-label">登陆名</label>
            <div class="col-sm-8">
              <input type="text" v-model="user.userLoginName" class="form-control" @dblclick="write" id="userLoginName" readonly>
            </div>
            <div class="col-sm-2">
              <button class="btn btn-default" @click="writeByBtn('userLoginName')">编辑</button>
            </div>
          </div>
          <div class="form-group">
            <label for="userEmail" class="col-sm-2 control-label">邮箱</label>
            <div class="col-sm-8">
              <input type="email" v-model="user.userEmail" class="form-control" @dblclick="write" id="userEmail" readonly>
            </div>
            <div class="col-sm-2">
              <button class="btn btn-default" @click="writeByBtn('userEmail')">编辑</button>
            </div>
          </div>
          <div class="form-group">
            <label for="userPhone" class="col-sm-2 control-label">电话号码</label>
            <div class="col-sm-8">
              <input type="text" v-model="user.userPhone" class="form-control" @dblclick="write" id="userPhone" readonly>
            </div>
            <div class="col-sm-2">
              <button class="btn btn-default" @click="writeByBtn('userPhone')">编辑</button>
            </div>
          </div>
          <div class="form-group">
            <label  class="col-sm-2 control-label">组织名</label>
            <div class="col-sm-8">
              <input type="text" v-model="user.org.orgName" class="form-control"  readonly>
            </div>
          </div>
          <div class="form-group">
            <label  class="col-sm-2 control-label">部门名</label>
            <div class="col-sm-8">
              <input type="text" v-model="user.dep.depName" class="form-control"  readonly>
            </div>
          </div>
          <div class="form-group">
            <label  class="col-sm-2 control-label">职位</label>
            <div class="col-sm-8">
              <input type="text" v-model="user.pos.posName" class="form-control"  readonly>
            </div>
          </div>
          <div class="form-group">
            <label  class="col-sm-2 control-label">入职时间</label>
            <div class="col-sm-8">
              <input type="text" v-model="user.userEntityTime" class="form-control" readonly>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-offset-2 col-sm-10">
              <button class="btn btn-default" @click="save">保存</button>
            </div>
          </div>
        </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user:{
          userName:"张三",
          userLoginName:"1945282561",
          userEmail:"1945282561@qq.com",
          userPhone:"18376301879",
          userEntityTime:"2019-09-28",
          org:{orgName:"南宁学院"},
          dep:{depName:"信息工程学院"},
          pos:{posName:"副部长"}
        }
    }
  },
  methods: {
    //使只读变为可写
    write(e){
      e.target.readOnly = false
    },
    //通过按钮将输入框变为可写
    writeByBtn(id){
      document.getElementById(id).readOnly = false
    },
    //保存
    save(){
      console.log(this.user)
    }
  },
}
</script>

<style>
  .userinfo-container{
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      border-radius: 5px;
      background-color: #fff;
    }
    .user-info{
      width: 70%;
      border-radius: 5px;
      border: 1px solid #2d2d2d2d;
      padding: 2%;
    }

</style>