<template>
  <div>
    <div style="width:100%;">
      <ol class="breadcrumb">
          <li>审批</li>
          <li>正在进行</li>
      </ol>
    </div>
      <div class="list-group">
        <a href="#" class="list-group-item apply-item">
            <div>
                <img src="../../../../assets/head.png" width="64px" height="64px">
            </div>
            <div >
                <h4>关于组件技术部的申请</h4>
                <div>
                    <span>已提交至:信息工程学院</span>
                </div>
                <div>
                    <span class="date">提交时间:2019-10-07 12:00:00</span>
                </div>
            </div>
        </a>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
    .apply-item{
      display: flex;
      flex-direction: row;
    }
</style>