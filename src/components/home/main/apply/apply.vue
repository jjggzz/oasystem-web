<template>
  <div class="main-container">
    <div class="main-container-left">
        <ul class="list-group">
        <router-link to="/home/apply/createapply" tag="li" class="list-group-item">
            发起申请
        </router-link>
        <router-link to="/home/apply/underwayapply" tag="li" class="list-group-item">
            正在进行
        </router-link>
        <router-link to="/home/apply/historyapply" tag="li" class="list-group-item">
            历史申请
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