<template>
  <el-container>
    <el-main style="height:450px;">
        <el-row >
            <el-col :span="24" >   
                <ul  v-infinite-scroll="load" style="overflow:auto;list-style:none">
                     <li v-for="(item, index) in infoList" :key="index">
                        <div :class="item.userId === accountInfo.userId?'right':'left' ">
                        <el-avatar shape="square" :size="50" :src="squareUrl"></el-avatar>
                        <div :class="item.userId === accountInfo.userId?'right-right':'' ">
                            <span class="userName">{{item.userName}}：</span>
                            <div class="message">
                                {{item.content}}
                            </div>
                        </div>
                        </div>
                    </li>
                </ul>
            </el-col>
        </el-row>
    </el-main>
  </el-container>
</template>

<script>
export default {
    computed: {
        infoList:function(){
            return this.$store.getters.getMessageListByTargetId(this.accountInfo.userDepartmentId)
        }
    },
    data() {
        return {    
            squareUrl: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
             accountInfo: {
                userId:'',
                portrait: '',
                position: '',
                userAccount:'',
                userEmail:'',
                userName:'',
                userPhone:'',
                userDepartmentName:'',
                userDepartmentId:''
            },
        }
    },
     methods: {
      load () {

      }
    },
    created() {
        this.accountInfo = JSON.parse(sessionStorage.getItem("userInfo"))
    },
}
</script>

<style scoped>
    .left{
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: flex-start;
    }
    .right{
        display: flex;
        flex-direction:row-reverse;
        align-items: flex-start;
        justify-content: flex-start;
    }
    .right-right{
         display: flex;
        flex-direction:column;
        align-items: flex-end;
        justify-content: flex-start;
    }
    .userName{
        color: #909399;
        font-size: 12px
    }
    .message{
        background-color: #67C23A;
        margin: 3px;
        padding: 5px;
        border-radius: 5px;
        width: auto;
        white-space:normal; 
        word-break:break-all;
        overflow:hidden;
    }
</style>