export default{
    ws:{},
    setWs:function(userId,depId){

        if(typeof(WebSocket) === 'undefined'){
            console.log("您的浏览器不支持socket")
        }
        else{
            //创建实例
            this.ws = new WebSocket('ws://localhost:8081/oasystem/webSocket/'+userId+'/'+depId);
            //监听连接
            this.ws.onopen = function(){
                console.log('连接成功')
            }
            //监听错误信息
            this.ws.onerror = function(){
                console.log("连接错误");
            }
        }
    }
}