<template>
  <el-container>
      <el-main>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="技术文章管理" name="first">
                <technologyPage></technologyPage>
            </el-tab-pane>
            <el-tab-pane label="灌水文章管理" name="second">
                <wafflePage></wafflePage>
            </el-tab-pane>
        </el-tabs>
      </el-main>
  </el-container>
</template>

<script>
import technologyPage from './technologyPage'
import wafflePage from './wafflePage'

export default {
    components:{
        "wafflePage":wafflePage,
        "technologyPage":technologyPage
    },
    data() {
        return {
            activeName: 'first'
        }
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        },
        getArticleList(){
            this.axios.get("/article/articleList")
            .then((res)=>{
                if(res.data.status == 0){
                    this.$store.commit('updateArticleList',res.data.data.articleList)
                }
                else{
                    this.$message({
                    type: 'error',
                    message: res.data.msg
                }); 
                }
            })
            .catch((res)=>{
                this.$message({
                    type: 'warning',
                    message: "请求获取文章列表失败"
                }); 
            })
        }
    },
    created() {
        this.getArticleList()
    },
}
</script>

<style>

</style>