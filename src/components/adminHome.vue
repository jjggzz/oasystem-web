<template>
  <el-container>
    <el-header>
      <!-- 头部导航条 -->
      <el-menu
        :default-active="default_active"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        >
        <el-menu-item index="1">管理员专属</el-menu-item>
        <el-menu-item index="/adminHome/userManage" route="true">用户管理</el-menu-item>
        <el-menu-item index="3">部门管理</el-menu-item>
        <el-submenu index="4">
          <template slot="title">结构管理</template>
          <el-submenu index="4-1">
            <template slot="title">人员管理</template>
            <el-menu-item index="2-4-1">部门分配</el-menu-item>
            <el-menu-item index="2-4-2">职位分配</el-menu-item>
          </el-submenu>
          <el-menu-item index="4-2">职务管理</el-menu-item>
          <el-menu-item index="4-3">流程管理</el-menu-item>
      </el-submenu>
        <el-menu-item index="5">权限管理</el-menu-item>
        <el-menu-item index="6">论坛管理</el-menu-item>
      </el-menu>
    </el-header>
    <el-main>
      <!-- 页面主体 -->
      <router-view></router-view>

    </el-main>
    <el-footer >
      <!-- 页脚 -->
      <p class="footer">作者邮箱:1945282561@qq.com 后端框架:springboot(ssm) ui框架:elementUI js框架:vue</p>
    </el-footer>
</el-container>
</template>

<script>

export default {
  data() {
    return {
      default_active: '1',
    }
  },
  methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
        this.$router.push({path:key})
      },
  }

}
</script>

<style scoped>
  .footer{
    text-align: center;
  }

</style>