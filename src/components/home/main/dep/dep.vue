<template>
  <div class="main-container">
    <div class="main-container-left">
      <ul class="list-group">
        <router-link to="/home/dep/depinfo" tag="li" class="list-group-item">
            部门信息
        </router-link>
        <router-link to="/home/dep/depmember" tag="li" class="list-group-item">
            成员列表
        </router-link>
      </ul>
    </div>
    <div class="main-container-right">

      <transition name="main-anima" mode="out-in">
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


</style>