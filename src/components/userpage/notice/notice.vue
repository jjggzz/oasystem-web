<template>
  <el-container direction="vertical">
      <el-main style="padding:0">
        <el-tabs style="height: 630px;" type="border-card" :tab-position="'left'">
            <el-tab-pane>
                <span slot="label"><i class="el-icon-collection"></i> 未读通知</span>
                <unReadNotice></unReadNotice>
            </el-tab-pane>
            <el-tab-pane >
                <span slot="label"><i class="el-icon-notebook-2"></i> 已读通知</span>
                <readNotice></readNotice>
            </el-tab-pane>
            <el-tab-pane >
                <span slot="label"><i class="el-icon-edit"></i> 发送通知</span>
                <sendNotice></sendNotice>
            </el-tab-pane>
            <el-tab-pane >
                <span slot="label"><i class="el-icon-notebook-1"></i> 我的通知</span>
                <meNotice></meNotice>
            </el-tab-pane>
        </el-tabs>
      </el-main>
  </el-container>
</template>

<script>
import readNotice from './readNotice'
import sendNotice from './sendNotice'
import unReadNotice from './unReadNotice'
import meNotice from './meNotice'

export default {
    components:{
        'readNotice':readNotice,
        "sendNotice":sendNotice,
        "unReadNotice":unReadNotice,
        'meNotice':meNotice
    },
    data() {
        return {
            
        }
    },
}
</script>

<style>

</style>