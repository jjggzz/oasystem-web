<template>
  <div>
       <div style="width:100%;">
        <ol class="breadcrumb">
            <li>组织</li>
            <li>组织成员</li>
        </ol>
        <memberlist></memberlist>
    </div>
  </div>
</template>

<script>
import memberlist from '../../../subcom/memberlist'
export default {
    components:{
        'memberlist':memberlist
    }
}
</script>

<style>

</style>