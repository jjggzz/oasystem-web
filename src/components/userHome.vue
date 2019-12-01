<template>
  <el-container >
    <!-- 头部导航栏 -->
    <el-header>
        <el-menu
          :default-active="activeIndex2"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-submenu index="1">
            <template slot="title">聊天模块</template>
            <el-menu-item index="1-1">组织聊天</el-menu-item>
            <el-menu-item index="1-2">部门聊天</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">通知模块</template>
            <el-menu-item index="2-1">发送通知</el-menu-item>
            <el-menu-item index="2-2">历史通知</el-menu-item>
            <el-menu-item index="2-3">发送通知</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">事务管理</template>
            <el-menu-item index="3-1">发起事务</el-menu-item>
            <el-menu-item index="3-2">我的事务</el-menu-item>
            <el-menu-item index="3-3">审批事务</el-menu-item>
          </el-submenu>
          <el-menu-item index="4">文件列表</el-menu-item>
           <el-menu-item index="5">成员名册</el-menu-item>
          <el-submenu index="6" >
            <template slot="title">个人中心</template>
            <el-menu-item index="6-1" @click="dialog = true">个人信息</el-menu-item>
            <el-menu-item index="6-2">未读消息</el-menu-item>
            <el-menu-item index="6-3">修改密码</el-menu-item>
          </el-submenu>
          <el-menu-item  class="right">
            <i class="el-icon-switch-button"></i>
          </el-menu-item>
        </el-menu>
    </el-header>
    <el-main>
      <el-drawer
        title="个人信息"
        :before-close="handleClose"
        :visible.sync="dialog"
        direction="rtl"
        custom-class="demo-drawer"
        ref="drawer"
        >
        <div class="demo-drawer__content">
          <el-form :model="form" label-position="left">
            <el-form-item label="用户名" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="登录名" :label-width="formLabelWidth">
              <el-input v-model="form.loginName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="个人电话" :label-width="formLabelWidth">
              <el-input v-model="form.phone" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" :label-width="formLabelWidth">
              <el-input v-model="form.email" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="所属部门" :label-width="formLabelWidth">
              {{form.dep}}
            </el-form-item>
            <el-form-item label="职位" :label-width="formLabelWidth">
              {{form.pos}}
            </el-form-item>
            <el-form-item label="个人介绍" :label-width="formLabelWidth">
              <el-input
                type="textarea" :rows="2" placeholder="请输入内容" v-model="form.info"></el-input>
            </el-form-item>
          </el-form>
          <div class="demo-drawer__footer">
            <el-button @click="cancelForm">取 消</el-button>
            <el-button type="primary" @click="$refs.drawer.closeDrawer()" :loading="loading">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
          </div>
        </div>
      </el-drawer>
    </el-main>
    <el-footer>
      <!-- 页脚部分 -->
      
    </el-footer>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      activeIndex2: '1-1',
      dialog: false,
      loading: false,
      form: {
        name: '张三',
        loginName: '123456',
        phone:'18376301879',
        email:'123@123.com',
        dep:'信息工程学院',
        pos:'辅导员',
        info:'一位新入职的辅导员，请多多关照！',
      },
      formLabelWidth: '80px',
      timer: null,
    }
  },
  methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(done) {
      if (this.loading) {
        return;
      }
       this.loading = true;
      this.timer = setTimeout(() => {
        done();
        // 动画关闭需要一定的时间
        setTimeout(() => {
          this.loading = false;
        }, 400);
      }, 2000);

    },
    cancelForm() {
      this.loading = false;
      this.dialog = false;
      clearTimeout(this.timer);
    }
  },


}
</script>

<style scoped>
  .right{
    position: absolute;
    right: 0px;
  }
  .demo-drawer__content{
    padding: 20px;
  }
  .demo-drawer__footer{
    width: 100%;
    position: absolute;
    bottom: 0px;
    padding-bottom: 20px;
    display: flex;
    flex-direction: row;
    justify-content:space-around
  }

</style>