<template>
  <div class="depinfo-container">
    <div style="width:100%;">
        <ol class="breadcrumb">
            <li>部门</li>
            <li>部门信息</li>
        </ol>
    </div>
    <div class="dep-info">
        <form class="form-horizontal">
          <div class="form-group">
            <label for="depName" class="col-sm-2 control-label">部门名</label>
            <div class="col-sm-8">
              <input type="text" v-model="dep.depName" class="form-control"   @dblclick="write" id="depName"  readonly>
            </div>
            <div class="col-sm-2">
              <button class="btn btn-default" @click="writeByBtn('depName')">编辑</button>
            </div>
          </div>
          <div class="form-group">
            <label  class="col-sm-2 control-label">所属组织</label>
            <div class="col-sm-8">
              <input type="text" v-model="dep.org.orgName" class="form-control"  readonly>
            </div>
          </div>
          <div class="form-group">
            <label  class="col-sm-2 control-label">部门人数</label>
            <div class="col-sm-8">
              <input type="text" v-model="dep.depPeopleNumber" class="form-control"  readonly>
            </div>
          </div>
          <div class="form-group">
            <label  class="col-sm-2 control-label">创建时间</label>
            <div class="col-sm-8">
              <input type="text" v-model="dep.depCreateTime" class="form-control" readonly>
            </div>
          </div>
          <div class="form-group">
            <label for="depDescribe" class="col-sm-2 control-label">部门描述</label>
            <div class="col-sm-8">
                <textarea class="form-control" v-model="dep.depDescribe" id="depDescribe" @dblclick="write" rows="3" readonly></textarea>
            </div>
            <div class="col-sm-2">
              <button class="btn btn-default" @click="writeByBtn('depDescribe')">编辑</button>
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
      dep:{
          depName:"信息工程学院",
          depDescribe:"开展信息类学科的教学",
          depCreateTime:"2019-09-28",
          depPeopleNumber:10,
          org:{orgName:"南宁学院"}
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

<style scoped>
  .depinfo-container{
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      border-radius: 5px;
      background-color: #fff;
    }
    .dep-info{
      width: 70%;
      border-radius: 5px;
      border: 1px solid #2d2d2d2d;
      padding: 2%;
    }
</style>