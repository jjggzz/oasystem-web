<template>
  <el-container>
      <el-main>
        <el-row :gutter="20">
              <el-col  :span="10" :offset="2">
                <div style="height:400px">
                  <h1 style="text-align: center">节点列表</h1>
                  <div v-for="(item,index) in flowNodeList" :key='index' class="flowNodeList">
                    <el-tag type="info">{{item.flowNodeName}}</el-tag>
                    <el-tag type="info">{{item.flowNodeDescription}}</el-tag>
                    <el-button @click="set(item,index)" size="mini">添加</el-button>
                  </div>
                </div>
              </el-col>
               <el-col  :span="10" >
                 <div style="height:400px">
                  <h1 style="text-align: center">顺序列表</h1>
                  <div v-for="(item,index) in orderlyList" :key='index' class="flowNodeList">
                    <span> 第{{index+1}}节点：<el-tag type="info">{{item.flowNodeName}}</el-tag></span> 
                    <el-tag type="info">{{item.flowNodeDescription}}</el-tag>
                    <el-button @click="unSet(item,index)" size="mini">移除</el-button>
                  </div>
                </div>
              </el-col>
        </el-row>
        <el-row>
          <el-col class="btn" :span="24">
            <el-button type="info" @click="prev">上一步</el-button>
            <el-button @click="Ack" type="success">下一步</el-button>
          </el-col>
        </el-row>
      </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      flowNodeList:this.$store.state.flowNodeList,
      orderlyList:[]
    }
  },
  methods: {
    Ack(){
      if(this.orderlyList.length == 0){
        this.$message({
          type:'warning',
          message:'顺序列表为空'
        })
        return
      }
      this.$store.commit('updateFlowNodeList',this.orderlyList);
      this.$store.commit('updateCurrentSteps',4)
    },
    prev(){
      //流程到第二步
      this.$store.commit('updateCurrentSteps',2)
    },
    unSet(item,index){
      this.orderlyList.splice(index,1)
      this.flowNodeList.push(item)
    },
    set(item,index){
      this.orderlyList.push(item)
      this.flowNodeList.splice(index,1)
    }
  },
}
</script>

<style scoped>
  .flowNodeList{
    padding: 10px;
    margin: 5px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
  }
  .btn{
    display: flex;
    justify-content:center;
  }
</style>