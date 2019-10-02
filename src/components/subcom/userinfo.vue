<template>
  <div class="user-info">
        <form class="form-horizontal">
          <div class="form-group">
            <label for="userName" class="col-sm-2 control-label">用户名</label>
            <div class="col-sm-8">
              <input type="text" v-model="user.userName" class="form-control"   @dblclick="write" id="userName"  readonly>
            </div>
            <div v-if="isme" class="col-sm-2">
              <button class="btn btn-default" @click="writeByBtn('userName')">编辑</button>
            </div>
          </div>
          <div class="form-group">
            <label for="userLoginName" class="col-sm-2 control-label">登陆名</label>
            <div class="col-sm-8">
              <input type="text" v-model="user.userLoginName" class="form-control" @dblclick="write" id="userLoginName" readonly>
            </div>
            <div v-if="isme" class="col-sm-2">
              <button class="btn btn-default" @click="writeByBtn('userLoginName')">编辑</button>
            </div>
          </div>
          <div class="form-group">
            <label for="userEmail" class="col-sm-2 control-label">邮箱</label>
            <div class="col-sm-8">
              <input type="email" v-model="user.userEmail" class="form-control" @dblclick="write" id="userEmail" readonly>
            </div>
            <div v-if="isme" class="col-sm-2">
              <button class="btn btn-default" @click="writeByBtn('userEmail')">编辑</button>
            </div>
          </div>
          <div class="form-group">
            <label for="userPhone" class="col-sm-2 control-label">电话号码</label>
            <div class="col-sm-8">
              <input type="text" v-model="user.userPhone" class="form-control" @dblclick="write" id="userPhone" readonly>
            </div>
            <div v-if="isme" class="col-sm-2">
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
          <div v-if="isme" class="form-group">
            <div class="col-sm-offset-2 col-sm-10">
              <button class="btn btn-default" @click="save">保存</button>
            </div>
          </div>
        </form>
    </div>
</template>

<script>
export default {
    props:['data','isme'],
  data() {
    return {
      user:{}
    }
  },
  created() {
      this.user = this.data
      console.log(this.isme)
  },
  methods: {
    //使只读变为可写
    write(e){
        if(this.isme){
            e.target.readOnly = false
        }

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

<style scoped>
    .user-info{
      width: 70%;
      border-radius: 5px;
      border: 1px solid #2d2d2d2d;
      padding: 2%;
    }
</style>