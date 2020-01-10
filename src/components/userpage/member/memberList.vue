<template>
  <el-container>
      <el-main style="padding:0px">
        <el-row  type='flex' justify='space-between'>
            <el-col :span="3"></el-col>
            <el-col :span="7">
                <el-input size="small" placeholder="请输入关键字" v-model="search" class="input-with-select">
                <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </el-col>
        </el-row>
        <div class="c">
        <el-card shadow="hover" v-for="(item, index) in showList" :key="index">
            <div class="item"> 
                <div class="item-head" >
                    <el-avatar :size="100" :src="item.userHeadFilePath==null?'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png':item.userHeadPortrait"></el-avatar>
                </div>
                <div class="item-info">
                    <div class="text">
                        用户名：<el-tag size="mini" type="info">{{item.userName}}</el-tag>
                    </div>
                    <div class="text">
                        联系电话：<el-tag size="mini" type="success">{{item.userPhone}}</el-tag>
                    </div>
                    <div class="text">
                        邮箱：<el-tag size="mini" type="success">{{item.userEmail}}</el-tag>
                    </div>
                    <div class="text">
                        所属部门：<el-tag size="mini">{{item.department==null?'无':item.department.departmentName}}</el-tag>
                    </div>
                    <div class="text">
                    职位：<el-tag size="mini">{{item.position==null?"无":item.position.positionName}}</el-tag>
                    </div>
                </div>
            </div>
        </el-card>
        </div>
      </el-main>
  </el-container>
</template>

<script>
export default {
    computed: {
        showList(){
            return this.userList.filter((item)=>{
                if((item.userName!=null&&item.userName.includes(this.search))||
                    (item.userPhone!=null&&item.userPhone.includes(this.search))||
                    (item.department!=null&&item.department.departmentName!=null&&item.department.departmentName.includes(this.search))||
                    (item.position!=null&&item.position.positionName!=null&&item.position.positionName.includes(this.search))){
                    return item 
                }
            })
        }
    },
    data() {
        return {
            userList:[],
            search:''   
        }
    },
    methods: {
        load () {

        },
        getUserList(){
            this.axios.get("/user/userList")
            .then((res)=>{
            console.log(res)
                if(res.data.status == 0){
                    this.userList = res.data.data.userList
                }
                else{
                    this.$message({
                    message: res.data.msg,
                    type: 'error'
                    })
                }

            })
            .catch((res)=>{
            this.$message({
                message: "请求用户列表失败",
                type: 'warning'
                })
            })
        },
    },
    created() {
        this.getUserList()
    },
}
</script>

<style scoped>
    .c{
        margin-top: 5px;
        flex-wrap: wrap;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
    }
    .item{
        width: 251px;
        flex: 3;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
    }
    .text{
        font-size: 11px;
        padding: 1px 0px
    }
    .item-info{
        padding-left: 12px;
    }
    .item-head{
        border-radius: 50%;
        /* padding-left: 12px; */
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    }
</style>