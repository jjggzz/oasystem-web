<template>
  <el-container style="height: 630px; border: 1px solid #eee">
  <el-aside width="220px" style="height: 630px; border: 1px solid #eee">
      <el-menu
      :default-active="active"
      :router="true"
      class="el-menu-vertical-demo">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-document-checked"></i>
          <span>我的任务</span>
        </template>
          <el-menu-item index="/userHome/task/createTask">创建任务</el-menu-item>
          <el-menu-item index="/userHome/task/myBacklog">我的待办</el-menu-item>
          <el-menu-item index="/userHome/task/continuing">正在进行</el-menu-item>
          <el-menu-item index="/userHome/task/historyTask">历史任务</el-menu-item>
      </el-submenu>
    <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-document"></i>
          <span>待办任务</span>
        </template>
          <el-menu-item index="/userHome/task/examine">流程审批</el-menu-item>
          <el-menu-item index="/userHome/task/historyExamine">历史审批</el-menu-item>
    </el-submenu>
    </el-menu>
  </el-aside>
  <el-main>
      <router-view></router-view>
  </el-main>
</el-container>
</template>

<script>
export default {
    data() {
        return {
            active:'/userHome/task/createTask'
        }
    },
    methods: {

    },
}
</script>

<style>

</style>