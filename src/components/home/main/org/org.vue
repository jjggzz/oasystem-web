<template>
   <div class="main-container">
    <div class="main-container-left">
      <ul class="list-group">
        <router-link to="/home/org/orginfo" tag="li" class="list-group-item">
            组织信息
        </router-link>
        <router-link to="/home/org/deplist" tag="li" class="list-group-item">
            部门列表
        </router-link>
        <router-link to="/home/org/orgmember" tag="li" class="list-group-item">
            组织成员
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