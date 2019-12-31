<template>
  <el-container>
      <el-main style="height:600px;padding:0px">
        <el-row  type='flex' justify='space-between'>
          <el-col :span="6">
            <el-button type="info" @click="getNoticeList" icon="el-icon-refresh" size="small">重新载入</el-button>
          </el-col>
          <el-col :span="7">
             <el-input size="small" placeholder="请输入标题" v-model="search" class="input-with-select">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </el-col>
        </el-row>
        
        <ul  v-infinite-scroll="load" style="overflow:auto;list-style:none">
              <li v-for="(item, index) in showlist" :key="index">
                <el-card :body-style="{ padding: '15px' }"  shadow="hover">
                  <div class="item">
                  <div>
                    <p>{{item.noticeTitle}}</p>
                    <p class="item-description">{{item.noticeDescription}}</p>
                  </div>
                  <div class="item-date">
                    <p class="text">发送时间：{{item.noticeSendTime | dateFormart}}</p>
                  </div>
                </div>
              </el-card>
            </li>
        </ul>
      </el-main>
  </el-container>
</template>

<script>
export default {
  computed:{
    showlist(){
      return this.noticeList.filter((item)=>{
        if(item.noticeTitle.includes(this.search)){
          return item
        }
      })
    }
  },
  data() {
    return {
      search:'',
      noticeList:[]
    }
  },
  created() {
    this.getNoticeList()
  },
  methods: {
    load () {

    },
    //获取已读通知列表
    getNoticeList(){
      var info = JSON.parse(sessionStorage.getItem("userInfo"))
      this.axios.get('/notice/readNoticeList/'+info.userId)
      .then((res)=>{
        if(res.data.status == 0){
          this.noticeList = res.data.data.noticeList
        }
      })
      .catch((res)=>{
         this.$message({
            type:'warning',
            message:"请求获取通知列表失败"
          })
      })
    }
  },
}
</script>

<style scoped>
  .item{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .item-description{
    font-size: 12px;
    color: #797878;
  }
  .text{
    font-size: 12px;
    color: #5b5b5b;
  }
  .item-date{
     display: flex;
    flex-direction:column;
    justify-content: flex-end;
  }
  p{
    margin: 7px 0px;
  }
</style>