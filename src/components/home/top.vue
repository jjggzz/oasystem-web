<template>
  <nav class="navbar navbar-default navbar-fixed-top">
    <div class="container-fluid">
      <!-- Brand and toggle get grouped for better mobile display -->
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" >Brand</a>
      </div>

      <!-- Collect the nav links, forms, and other content for toggling -->
      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul class="nav navbar-nav">
          <router-link to="/home/chat" tag="li"><a >组织交流 </a></router-link>
          <!-- <li class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">组织交流 <span class="caret"></span></a>
            <ul class="dropdown-menu">
              <li><a href="#">部门聊天</a></li>
              <li role="separator" class="divider"></li>
              <li><a href="#">组织聊天</a></li>
            </ul>
          </li> -->
          <router-link to="/home/file" tag="li"><a >组织文件 </a></router-link>
          <!-- <li class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">组织文件 <span class="caret"></span></a>
            <ul class="dropdown-menu">
              <li><a href="#">文件列表</a></li>
              <li role="separator" class="divider"></li>
              <li><a href="#">文件管理</a></li>
            </ul>
          </li> -->
          <router-link to="/home/apply" tag="li"><a >审批申请 </a></router-link>
          <!-- <li class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">审批申请 <span class="caret"></span></a>
            <ul class="dropdown-menu">
              <li><a href="#">发起申请</a></li>
              <li role="separator" class="divider"></li>
              <li><a href="#">正在进行</a></li>
              <li role="separator" class="divider"></li>
              <li><a href="#">历史申请</a></li>
            </ul>
          </li> -->
          <router-link to="/home/notice" tag="li"><a >通知管理 </a></router-link>
          <!-- <li class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">通知管理 <span class="caret"></span></a>
            <ul class="dropdown-menu">
              <li><a href="#">历史通知</a></li>
              <li role="separator" class="divider"></li>
              <li><a href="#">发送通知</a></li>
            </ul>
          </li> -->
        </ul>
        <ul class="nav navbar-nav navbar-right">
          <li><router-link to="/home/org">{{user.orgName}}</router-link></li>
          <li><router-link to="/home/dep/depinfo">{{user.depName}}</router-link></li>
          <li><router-link to="/home/user/userinfo">{{user.userName}}</router-link></li>
          <li><router-link to="/home/message/unreadmessages">  <span class="glyphicon glyphicon-envelope"></span><span> {{msgcount}}</span></router-link></li>
        </ul>
      </div><!-- /.navbar-collapse -->
    </div><!-- /.container-fluid -->
  </nav>
</template>

<script>
export default {
    props:['user','msgcount']
}
</script>

<style>

</style>