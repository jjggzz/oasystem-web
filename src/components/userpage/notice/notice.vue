<template>
  <el-container direction="vertical">
      <el-main style="padding:0">
        <el-tabs style="height: 630px;" type="border-card" :tab-position="'left'">
            <el-tab-pane>
                <span slot="label"><i class="el-icon-date"></i> 未读通知</span>
                <newNotice></newNotice>
            </el-tab-pane>
            <el-tab-pane >
                <span slot="label"><i class="el-icon-date"></i> 历史通知</span>
                <historyNotice></historyNotice>
            </el-tab-pane>
            <el-tab-pane >
                <span slot="label"><i class="el-icon-date"></i> 发送通知</span>
                <sendNotice></sendNotice>
            </el-tab-pane>
        </el-tabs>
      </el-main>
  </el-container>
</template>

<script>
import newNotice from './newNotice'
import sendNotice from './sendNotice'
import historyNotice from './historyNotice'

export default {
    components:{
        'newNotice':newNotice,
        "sendNotice":sendNotice,
        "historyNotice":historyNotice
    },
    data() {
        return {
            
        }
    },
}
</script>

<style>

</style>