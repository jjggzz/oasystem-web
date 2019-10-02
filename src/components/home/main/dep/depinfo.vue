<template>
  <div class="depinfo-container">
    <div style="width:100%;">
        <ol class="breadcrumb">
            <li>部门</li>
            <li>部门信息</li>
        </ol>
    </div>
    <depinfo :data="dep" :isleader="true"></depinfo>
  </div>
</template>

<script>
import depinfo from '../../../subcom/depinfo'
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
    components:{
      'depinfo':depinfo
    }
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
   
</style>