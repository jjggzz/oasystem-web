<template>
  <div class="container">
        <h4 class="h item">欢迎使用本系统</h4>
        <!-- 按钮组 -->
        <div class="btn-group btn-group-justified item" role="group" >
            <div class="btn-group" role="group">
                <router-link type="button" class="btn btn-default" to="/loginAndRegister/login">登陆</router-link>
            </div>
            <div class="btn-group" role="group">
                <router-link type="button" class="btn btn-default" to="/loginAndRegister/register">注册</router-link>
            </div>
        </div>
        <!-- 表单 -->
        <transition  name="bounce" mode="out-in">
            <router-view class="item"></router-view>
        </transition>
 
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
    .container{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
    }
    .item{
        width: 50%;
        text-align: center;
    }

    .bounce-enter-active {
    animation: bounce-in .5s;
    }
    .bounce-leave-active {
    animation: bounce-in .5s reverse;
    }
    @keyframes bounce-in {
    0% {
        transform: scale(0);
    }
    50% {
        transform: scale(1.5);
    }
    100% {
        transform: scale(1);
    }
    }
    
</style>