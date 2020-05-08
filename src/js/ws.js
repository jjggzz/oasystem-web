export default{
    ws:{},
    setWs:function(userId,depId){

        if(typeof(WebSocket) === 'undefined'){
            console.log("您的浏览器不支持socket")
        }
        else{
            //创建实例
            this.ws = new WebSocket('ws://www.98guangzheng.xyz:8080/oasystem/webSocket/'+userId+'/'+depId);
            //监听连接
            this.ws.onopen = function(){
                console.log('连接成功')
            }
            //监听错误信息
            this.ws.onerror = function(){
                console.log("连接错误");
            }
            this.ws.onclose = function(){
                this.ws.close
                console.log("连接关闭");
            }
        }
    }
}