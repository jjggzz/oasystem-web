<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style scoped>
  #app{
    width: 100%;
    height: calc(100vh);/**浏览器可用100%高度 */
    padding: 3px;
    overflow-y: hidden;
    overflow-x: hidden;
    background-color: #EDEDED;
  }
</style>
