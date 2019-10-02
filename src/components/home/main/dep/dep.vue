<template>
  <div class="dep-container">
    <div class="left">
      <ul class="list-group">
        <router-link to="/home/dep/depinfo" tag="li" class="list-group-item">
            部门信息
        </router-link>
        <router-link to="/home/dep/depmember" tag="li" class="list-group-item">
            成员列表
        </router-link>
      </ul>
    </div>
    <div class="right">

      <transition name="msg" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
  .dep-container{
    width: 100%;
    height: calc(91vh);
    display: flex;
    flex-direction: row;
    justify-content: center;
    justify-items: center;
  }
  .left{
    flex:1.5;
    padding: 5px;
    background-color: #fff;
    border-radius: 5px;
    margin-right: 5px;
  }
  .right{
    flex:8.5;
    padding: 5px;
    background-color: #fff;
    border-radius: 5px;
    margin-left: 5px;
    overflow:auto;
    overflow-x: hidden;
  }
  .msg-enter-active {
    animation: bounce-in .5s;
    }
    .msg-leave-active {
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