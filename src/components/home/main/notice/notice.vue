<template>
  <div class="main-container">
      <div class="main-container-left">
        <ul class="list-group">
          <router-link to="/home/notice/historynotice" tag="li" class="list-group-item">
              历史通知
          </router-link>
          <router-link to="/home/notice/sendnotice" tag="li" class="list-group-item">
              发送通知
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