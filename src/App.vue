<template>
  <div id="app">
    <transition  name="bounce" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<style scoped>
  #app{
    width: 100%;
    height: calc(100vh);/**浏览器可用100%高度 */
    padding: 3px;
    overflow-x: hidden;
    background-color: #EDEDED;
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
