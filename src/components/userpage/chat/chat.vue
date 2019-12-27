<template>
  <el-container direction="vertical">
      <el-main style="padding:0">
        <el-row >
            <el-tabs v-model="activeName" style="height: 500px;" :tab-position="'left'" type="border-card" @tab-click="handleClick">
                <el-tab-pane name="first">
                    <span slot="label"><i class="el-icon-chat-dot-round"></i> 组织聊天</span>
                    <orgChart></orgChart>
                </el-tab-pane>
                <el-tab-pane name="second">
                    <span slot="label"><i class="el-icon-chat-dot-round"></i> 部门聊天</span>
                    <depChart></depChart>
                </el-tab-pane>
            </el-tabs>
        </el-row>
        <div style="height:20px"></div>
        <el-row>
            <el-col class="send" :span="24">
                <el-input
                type="textarea"
                :autosize="{ minRows: 3, maxRows: 3}"
                placeholder="请输入内容,按ctrl+enter发送信息"
                v-model="info.content"
                @keydown.ctrl.enter.native="send">
                </el-input>
                <el-button style="margin-top:5px" @click="send" type="success">成功按钮</el-button>
            </el-col>
        </el-row>
      </el-main>
  </el-container>
</template>

<script>
import depChart from './depChat'
import orgChart from './orgChart'

export default {
    components:{
        'depChart':depChart,
        'orgChart':orgChart
    },
    data() {
        return {
            activeName: 'first',
            path:'ws://localhost:8081/oasystem/webSocket/',
            accountInfo:{},
            socket:'',
            info:{
                type:0,
                userId:"",
                userName:"",
                content:'',
                isBroadcast:true,
                targetId:''
            },
            sendtype:'first'
        }
    },
    created() {
        
    },
    mounted(){
        this.init()
    },
    destroyed() {
        // 销毁监听
        this.socket.onclose = this.close
    },
    methods: {
        handleClick(tab, event) {
            //设置发送的方式
            this.sendtype = tab.name;

        },
        init:function(){
            if(typeof(WebSocket) === 'undefined'){
                console.log("您的浏览器不支持socket")
            }
            else{
                var info =  JSON.parse(sessionStorage.getItem("userInfo"))
                //创建实例
                this.socket = new WebSocket(this.path+info.userId+'/'+info.userDepartmentId);
                //监听连接
                this.socket.onopen = this.open;
                //监听错误信息
                this.socket.onerror = this.error;
                //监听消息
                this.socket.onmessage = this.getMessage;
            }
        },
        open:function(){
            console.log("连接成功");
        },
        error:function(){
            console.log("连接错误");
        },
        getMessage:function(msg){
            var message = JSON.parse(msg.data)
            if(message.type == 0){
                this.$store.commit("updateMessageList",message)
            }
            if(message.type == 1){
                const h = this.$createElement;
                this.$notify({
                title: '标题名称',
                message: h('i', { style: 'color: teal'}, message.content)
                });
            }
        },
        send: function () {
            var storageInfo = JSON.parse(sessionStorage.getItem("userInfo"))
            if(storageInfo.userName == null || storageInfo.userName == 'undefined' || storageInfo.userName === ''){
                this.$message({
                    type:'warning',
                    message:'您还未设置用户名，请到个人中心设置'
                })
                return
            }
            if(this.info.content === ''){
                 this.$message({
                    type:'warning',
                    message:'输入内容不能为空'
                })
                return
            }
            this.info.userId = storageInfo.userId;
            this.info.userName = storageInfo.userName;
            if(this.sendtype === 'first'){
                this.info.targetId = 'public'
            }
            else{
                this.info.targetId = storageInfo.userDepartmentId
            }

            this.socket.send(JSON.stringify(this.info));
            this.info.content = ''
        },
        close: function () {
            console.log("socket已经关闭")
        }
    },
}
</script>

<style scpoed>
    .send{
        display: flex;
        flex-direction: column;
        align-items: flex-end
    }
</style>