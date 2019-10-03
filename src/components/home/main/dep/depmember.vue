<template>
  <div>
    <div style="width:100%;">
        <ol class="breadcrumb">
            <li>部门</li>
            <li>成员列表</li>
        </ol>
    </div>
    <div>
        <form class="form-horizontal">
            <div class="form-group">
                <label for="userName" class="col-sm-1 control-label">用户名</label>
                <div class="col-sm-11">
                    <input type="text" class="form-control" id="userName" placeholder="根据用户名查询成员">
                </div>
            </div>
        </form>
        <div class="list-group">
            <a href="#" class="list-group-item member-item">
                <div>
                    <img src="../../../../assets/head.png" width="64px" height="64px">
                </div>
                <div >
                    <div>部长:张三</div>
                    <div>
                        <span>电话:18376301879</span>
                    </div>
                    <div>
                        <span>email:1945282561@qq.com</span>
                    </div>
                </div>
            </a>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  components:{
  }
}
</script>

<style scoped>
    .member-item{
        display: flex;
        flex-direction: row;
    }
</style>