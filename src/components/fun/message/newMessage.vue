<template>
  <el-container>
      <el-main>
          <el-row :gutter="20">
              <el-col :span="16">
                <div class="item">
                    <div class="message">
                        <div class="con">
                            <el-tag type="info">有一位用户申请加入您的组织</el-tag>
                        </div>
                        <div class="date">
                            <el-tag size="mini" type="info">2019-11-07</el-tag>
                            <el-tag size="mini" type="info">未读</el-tag>
                        </div>
                    </div>
                    <div class="btn">
                        <el-button round type="info" size="mini">详情</el-button>
                    </div>
                </div>
                <div class="block">
                    <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage"
                    :page-sizes="[4, 8, 12, 16]"
                    :page-size="100"
                    layout="sizes, prev, pager, next"
                    :total="30">
                    </el-pagination>
                </div>
              </el-col>
              <el-col :span="8">

              </el-col>
          </el-row>
      </el-main>
  </el-container>
</template>

<script>
export default {
    data() {
        return {
            currentPage:1
        }
    },
    methods: {
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        }
    },
}
</script>

<style scoped>
    .item{
        border-radius: 5px;
        border: 1px solid #c5c5c5;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 2px;
        margin: 5px;
    }
    .message{
        display: flex;
        flex-direction: column;
        margin: 8px;
    }
    .date{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .con{
        margin: 8px 0px;
    }
    .btn{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .block{
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
</style>