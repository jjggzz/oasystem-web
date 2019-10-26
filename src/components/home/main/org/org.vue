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
        <!-- 如果是创建者才有这些操作的权限 -->
        <div v-if="true">
          <li role="separator" class="divider"></li>
          <router-link to="/home/org/createdep" tag="li" class="list-group-item">
            创建部门
          </router-link>
          <router-link to="/home/org/depmanage" tag="li" class="list-group-item">
            管理部门
          </router-link>
          <router-link to="/home/org/positionmanage" tag="li" class="list-group-item">
            职位管理
          </router-link>
          <router-link to="/home/org/membermanage" tag="li" class="list-group-item">
            人员管理
          </router-link>
          
        </div>
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