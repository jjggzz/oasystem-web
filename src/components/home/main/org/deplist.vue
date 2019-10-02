<template>
  <div class="deplist-container">
    <div style="width:100%;">
      <ol class="breadcrumb">
          <li>组织</li>
          <li>部门列表</li>
      </ol>
      <deplist></deplist>
    </div>
  </div>
</template>

<script>
import deplist from '../../../subcom/deplist'
export default {
  components:{
    'deplist':deplist
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
</style>