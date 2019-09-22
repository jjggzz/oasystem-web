<template>
  <div>
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
          <li class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">组织交流 <span class="caret"></span></a>
            <ul class="dropdown-menu">
              <li><a href="#">部门聊天</a></li>
              <li role="separator" class="divider"></li>
              <li><a href="#">组织聊天</a></li>
            </ul>
          </li>
          <li class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">组织文件 <span class="caret"></span></a>
            <ul class="dropdown-menu">
              <li><a href="#">文件列表</a></li>
              <li role="separator" class="divider"></li>
              <li><a href="#">文件管理</a></li>
            </ul>
          </li>
          <li class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">审批申请 <span class="caret"></span></a>
            <ul class="dropdown-menu">
              <li><a href="#">发起申请</a></li>
              <li role="separator" class="divider"></li>
              <li><a href="#">正在进行</a></li>
              <li role="separator" class="divider"></li>
              <li><a href="#">历史申请</a></li>
            </ul>
          </li>
          <li class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">通知管理 <span class="caret"></span></a>
            <ul class="dropdown-menu">
              <li><a href="#">历史通知</a></li>
              <li role="separator" class="divider"></li>
              <li><a href="#">发送通知</a></li>
            </ul>
          </li>
        </ul>
        <ul class="nav navbar-nav navbar-right">
          <li><a href="#">南宁学院</a></li>
          <li><a href="#">信息工程学院</a></li>
          <li><a href="#">张三</a></li>
          <li><a href="#">  <span class="glyphicon glyphicon-envelope"></span><span> 5</span></a></li>
        </ul>
      </div><!-- /.navbar-collapse -->
    </div><!-- /.container-fluid -->
  </nav>
  </div>
</template>

<script>
export default {
  
}
</script>

<style>

</style>