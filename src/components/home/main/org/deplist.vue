<template>
  <div class="deplist-container">
    <div style="width:100%;">
      <ol class="breadcrumb">
          <li>组织</li>
          <li>部门列表</li>
      </ol>
        <div>
      <form class="form-horizontal">
            <div class="form-group">
                <label for="depName" class="col-sm-1 control-label">部门名</label>
                <div class="col-sm-11">
                    <input type="text" class="form-control" id="depName" placeholder="根据部门名查询部门">
                </div>
            </div>
        </form>
        <div class="list-group">
            <a href="#" class="list-group-item dep-item">
                <div>
                    <img src="../../../../assets/dep.png" width="64px" height="64px">
                </div>
                <div>
                    <div>信息工程学院</div>
                    <div>部门人数:17</div>
                    <div>部门创建时间:2019-10-02</div>
                </div>
            </a>
        </div>
  </div>
    </div>
  </div>
</template>

<script>
export default {
  components:{
  }
}
</script>

<style scoped>
  .deplist-container{
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      border-radius: 5px;
      background-color: #fff;
    }
        .dep-item{
        display: flex;
        flex-direction: row;
    }
</style>