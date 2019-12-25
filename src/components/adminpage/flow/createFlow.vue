<template>
    <el-container>
        <el-main>
            <el-row>
                <el-col  :span="8" :offset="8">
                    <h1 class="head">设置流程名和流程描述</h1>
                    <el-form :model="flow" ref="flow" :rules="flowRules" label-width="80px">
                    <el-form-item label="流程名" prop="flowName">
                        <el-input v-model="flow.flowName"></el-input>
                    </el-form-item>
                    <el-form-item label="流程描述" prop="flowDescription">
                        <el-input type="textarea" v-model="flow.flowDescription"></el-input>
                    </el-form-item>
                    <el-form-item class="addFlowBtn">
                        <el-button type="success" @click="addFLow('flow')">添加并下一步</el-button>
                    </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
export default {
    computed: {
        
    },
    data() {
        return {
            flow: {
                flowName: '',
                flowDescription: ''
            },
            flowRules:{
                flowName:[
                    {required: true, message: '流程名必填', trigger: 'blur'}
                ],
                flowDescription:[
                    {required: true, message: '流程描述必填', trigger: 'blur'}
                ]
            }
        }
    },
    methods: {
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        addFLow(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    //如果校验通过，放入vuex
                    this.$store.commit('updateFlowName',this.flow.flowName);
                    this.$store.commit('UpdateFlowDescription',this.flow.flowDescription);
                    this.$message({
                        type:'success',
                        message:'添加成功'
                    })
                    //流程到第二步
                    this.$store.commit('updateCurrentSteps',2)
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }
    },
}
</script>

<style scoped>
    .head{
        text-align: center;
    }
    .addFlowBtn{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
</style>