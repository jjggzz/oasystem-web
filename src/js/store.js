import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    strict: true,
    // ...
    state:{
        currentSteps:1,
        flow:{
            flowName:'',
            flowDescription:''
        },
        flowNodeList:[]
    },
    getters:{
        flowNodeList:state=>{
            return state.flowNodeList
        }
    },
    mutations:{
        //修改流程名
        updateFlowName(state,flowName){
            state.flow.flowName = flowName
        },
        //修改流程描述
        UpdateFlowDescription(state,flowDescription){
            state.flow.flowDescription = flowDescription
        },
        //清空流程节点列表
        resetFlowNodeList(state){
            state.flowNodeList = []
        },
        //更新流程节点表
        updateFlowNodeList(state,flowNodelist){
            state.flowNodelist = flowNodelist
        },
        updateCurrentSteps(state,currentSteps){
            state.currentSteps = currentSteps
        }
    }
})

export default store