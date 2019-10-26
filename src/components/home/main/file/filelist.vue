<template>
  <div>
    <ol class="breadcrumb">
        <li>文件</li>
        <li>文件列表</li>
    </ol>

    <div>
        <form class="form-inline search">
            <div class="form-group">
                <label for="userName">上传者</label>
                <input type="text" class="form-control" id="userName" placeholder="上传文件的人">
            </div>
            <div class="form-group">
                <label for="noSendTime">最早上传时间</label>
                <input type="date" class="form-control" id="updateTime" >
            </div>
            <div class="form-group">
                <label >文件大小</label>
                <select class="form-control">
                    <option value="1">不限</option>
                    <option value="2">小于50k</option>
                    <option value="3">小于500k</option>
                    <option value="4">小于1M</option>
                    <option value="5">小于5M</option>
                    <option value="6">5M以上</option>
                </select>
            </div>
        </form>
        <div class="table-responsive">
        <table class="table table-hover">
            <thead>
                <tr>
                    <th>#</th>
                    <th>文件标题</th>
                    <th>上传者</th>
                    <th>上传时间</th>
                    <th>文件大小</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>关于组件技术小组</td>
                    <td>张三</td>
                    <td>2019-10-07 12:00:00</td>
                    <td>1024</td>
                    <td>
                        <button class="btn btn-success">下载</button>
                    </td>
                </tr>
            </tbody>
        </table>
        </div>
    </div>
        

  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
  .search{
     margin-bottom: 15px;
  }
</style>