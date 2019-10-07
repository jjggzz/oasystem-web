<template>
  <div class="dep-info">
        <h1 class="text-center">部门信息</h1>
        <form class="form-horizontal">
          <div class="form-group">
            <label for="depName" class="col-sm-2 control-label">部门名</label>
            <div class="col-sm-8">
              <input type="text" v-model="dep.depName" class="form-control"  @dblclick="write" id="depName"  readonly>
            </div>
            <div v-if="isleader" class="col-sm-2">
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
            <div v-if="isleader" class="col-sm-2">
              <button class="btn btn-default" @click="writeByBtn('depDescribe')">编辑</button>
            </div>
          </div>


          <div v-if="isleader" class="form-group">
            <div class="col-sm-offset-2 col-sm-10">
              <button class="btn btn-success" @click="save">保存</button>
            </div>
          </div>
        </form>
    </div>
</template>

<script>
export default {
    props:['data','isleader'],
  data() {
    return {
        dep:{}
    }
  },
  created() {
      this.dep = this.data
  },
  methods: {
    //使只读变为可写
    write(e){
        if(this.isleader){
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
    .dep-info{
      width: 70%;
      border-radius: 5px;
      border: 1px solid #2d2d2d2d;
      padding: 2%;
    }
</style>