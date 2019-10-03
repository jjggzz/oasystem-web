<template>
  <div>
      <div style="width:100%;">
          <ol class="breadcrumb">
              <li>通知</li>
              <li>历史通知</li>
          </ol>
      </div>

    <div>
      <form class="form-inline search">
      <div class="form-group">
        <label for="noTitle">通知标题</label>
        <input type="text" class="form-control" id="noTitle" placeholder="通知标题">
      </div>
      <div class="form-group">
        <label for="noSendTime">最早时间</label>
        <input type="date" class="form-control" id="noSendTime" >
      </div>
      <div class="form-group">
        <label >范围</label>
        <select class="form-control">
          <option value="1">所有</option>
          <option value="2">信息工程学院</option>
          <option value="3">土建学院</option>
        </select>
      </div>
    </form>
    <div class="list-group">
        <a href="#" class="list-group-item notice-item">
          <div class="notice-item-item">
              <img src="../../../../assets/notice.png" width="64px" height="64px">
              <div >
                  <h4>关于开始素质拓展活动</h4>
                  <div>
                      <span>发送部门:信息工程学院</span>
                  </div>
              </div>
          </div>
          
          <div>
              <span class="date">时间:2019-10-03 12:00:00</span>
          </div>
      </a>
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
   .search{
     margin-bottom: 15px;
  }
  .notice-item{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
  }
  .notice-item-item{
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
  }
</style>