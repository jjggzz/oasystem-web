<template>
  <div>
    <div style="width:100%;">
        <ol class="breadcrumb">
            <li>部门</li>
            <li>成员列表</li>
        </ol>
    </div>
    <depmemberlist></depmemberlist>
  </div>
</template>

<script>
import depmemberlist from '../../../subcom/depmemberlist'
export default {
  components:{
    'depmemberlist':depmemberlist
  }
}
</script>

<style>

</style>