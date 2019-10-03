<template>
  <div class="main-container">
    <div class="main-container-left">
      <ul class="list-group">
        <router-link to="/home/message/unreadmessages" tag="li" class="list-group-item">
          <span class="badge">3</span>
          未读消息
        </router-link>
        <router-link to="/home/message/historymessages" tag="li" class="list-group-item">
            <span class="badge">2</span>
            历史消息
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

<style scoped>

</style>