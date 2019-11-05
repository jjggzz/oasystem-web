<template>
  <el-container>
      <el-main>
          <div class="container">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>首页</el-breadcrumb-item>
                <el-breadcrumb-item>组织交流</el-breadcrumb-item>
                <el-breadcrumb-item>部门交流</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="chat-container">
                
            </div>
          </div>
      </el-main>
    <el-footer>
        <el-row :gutter="20">
            <!-- 显示在线人数 -->
            <el-col :span="4">
                <el-popover
                ref="popover4"
                placement="top"
                width="400"
                trigger="click">
                <el-table :data="gridData">
                    <el-table-column width="150" property="date" label="日期"></el-table-column>
                    <el-table-column width="100" property="name" label="姓名"></el-table-column>
                    <el-table-column width="300" property="address" label="地址"></el-table-column>
                </el-table>
                </el-popover>
                <el-button type="info" v-popover:popover4>查看在线人员</el-button>
            </el-col>
            <el-col :span="16">
                <el-input
                placeholder="请输入内容"
                v-model="text"
                clearable>
                </el-input>
            </el-col>
            <el-col :span="4">
                <el-button type="success" @click="sendMessage" round>发送</el-button>
            </el-col>
        </el-row>
    </el-footer>
  </el-container>
</template>

<script>
export default {
    data() {
        return {
            //输入的文本
            text:'',
            gridData:[
                {name:"张三",date:"2019-10-27",address:"南宁学院"}
            ]
        }
    },
    methods: {
        sendMessage(){
            //发送消息
            console.log(this.text);
        }
    },
}
</script>

<style scoped>
    .container{
        overflow:hidden;
        width: 100%;
        height: calc(69vh);
    }
    .chat-container{
        margin-top: 5px;
        height: 100%;
        width: 100%;
        overflow-x:hidden;
        overflow-y:scroll;
        background-color: #EDEDED;
    }
</style>