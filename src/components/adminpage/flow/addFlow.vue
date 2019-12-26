<template>
  <el-container>
      <el-header>
        <el-page-header @back="goBack" content="创建流程"></el-page-header>
      </el-header>
      <el-main>
        <el-steps :active="currentSteps" simple>
          <el-step title="添加流程" icon="el-icon-edit"></el-step>
          <el-step title="添加节点" icon="el-icon-upload"></el-step>
          <el-step title="设置流程步骤" icon="el-icon-picture"></el-step>
          <el-step title="最终确认" icon="el-icon-picture"></el-step>
        </el-steps>
        <div v-if='currentSteps == 1'>
          <createFlow></createFlow>
        </div>
          <div v-else-if="currentSteps == 2">
          <createNode></createNode>
        </div>
        <div v-if='currentSteps == 3'>
          <createLine></createLine>
        </div>
        <div v-if='currentSteps == 4'>
          <end></end>
        </div>
      </el-main> 
  </el-container>
</template>

<script>
import createFlow from './createFlow'
import createNode from './createNode'
import createLine from './createLine'
import end from './end'
export default {
  components:{
    'createFlow':createFlow,
    'createNode':createNode,
    'createLine':createLine,
    'end':end
  },
  computed: {
    currentSteps:function(){
      return this.$store.state.currentSteps
    }
  },
  data() {
    return {
    }
  },
  methods: {
    goBack() {
        this.$store.commit('updateCurrentSteps',1)
        this.$router.back(-1)
      }
  },
}
</script>

<style scoped>
  .addFlowBtn{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
</style>