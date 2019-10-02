<template>
 <div class="orginfo-container">
   <div style="width:100%;">
        <ol class="breadcrumb">
            <li>组织</li>
            <li>组织信息</li>
        </ol>
    </div>
  <orginfo :data="org" :isleader="false"></orginfo>
 </div>
</template>

<script>
import orginfo from '../../../subcom/orginfo'
export default {
  data() {
    return {
      org:{
        orgName:'南宁学院',
        depNumber:7,
        orgCreateTime:'2019-10-02',
        orgDescribe:'一所学校'
      }
    }
  },
  components:{
    'orginfo':orginfo
  }
}
</script>

<style>
  .orginfo-container{
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      border-radius: 5px;
      background-color: #fff;
    }
</style>
