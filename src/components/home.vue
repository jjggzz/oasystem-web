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
          <el-menu-item index="1">工作中心</el-menu-item>
          <el-submenu index="2">
            <template slot="title">我的工作台</template>
            <el-menu-item index="2-1">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
            <el-menu-item index="2-3">选项3</el-menu-item>
          </el-submenu>
          <el-menu-item index="3">我的消息</el-menu-item>
        </el-menu>
    </el-header>
    <el-container>
      <!-- 左侧菜单 -->
      <el-aside width="200px">
          <el-input
            placeholder="输入关键字进行过滤"
            v-model="filterText">
          </el-input>
          <el-tree
            class="filter-tree"
            :data="data2"
            :props="defaultProps"
            :highlight-current="true"
            :filter-node-method="filterNode"
            @node-click="show"
            ref="tree2">
          </el-tree>
      </el-aside>
      <!-- 右侧主要显示区域 -->
      <el-main>
        <router-view></router-view>
      </el-main>

    </el-container>
  </el-container>
</template>

<script>

export default {
  data() {
    return {
      activeIndex2: '1',
      filterText: '',
        data2: [{
          id: 1,
          label: '组织交流',
          children: [{
            id: 5,
            label: '部门聊天',
            path:'/home/depChat'
          },{
            id: 6,
            label: '组织聊天',
            path:'/home/orgChat'
          }]
        }, {
          id: 2,
          label: '组织文件',
          children: [{
            id: 7,
            label: '文件列表',
            path:'/home/fileList'
          }]
        }, {
          id: 3,
          label: '审批申请',
          children: [{
            id: 9,
            label: '发起申请'
          }, {
            id: 10,
            label: '正在进行'
          }, {
            id: 11,
            label: '历史申请'
          }, {
            id: 10,
            label: '正待审批'
          }, {
            id: 11,
            label: '历史审批'
          }]
        },{
          id: 4,
          label: '通知管理',
          children: [{
            id: 12,
            label: '历史通知'
          }, {
            id: 13,
            label: '发送通知',
            path:'/home/sendNotice'
          }]
        },{
          id: 4,
          label: '组织管理',
          children: [{
            id: 12,
            label: '组织信息'
          }, {
            id: 13,
            label: '部门列表'
          }, {
            id: 13,
            label: '组织成员'
          }, {
            id: 13,
            label: '创建部门'
          }, {
            id: 13,
            label: '管理部门'
          }, {
            id: 13,
            label: '职位管理'
          }, {
            id: 13,
            label: '人员管理'
          }, {
            id: 8,
            label: '文件管理'
          }
          ]
        },{
          id: 4,
          label: '消息管理',
          children: [{
            id: 12,
            label: '未读消息'
          }, {
            id: 13,
            label: '历史消息'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }, 
        currentRouter:'/home'
    }
  },
  methods: {
    handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    show(obj,node,he){
      //路由到对应的页面
      var add = obj.path
      if(add != undefined){
        
        if(this.currentRouter != add){
          this.currentRouter = add
          this.$router.push({path:add})
        }

      }

    }
  },
  watch: {
      filterText(val) {
        this.$refs.tree2.filter(val);
      }
    },

}
</script>

<style scoped>


</style>