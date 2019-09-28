<template>
  <div class="container-fluid box">
    <!-- 导航栏 -->
    <top :user='user' :msgcount='msgcount'></top>
    <transition name="main">
      <router-view ></router-view>
    </transition>
  </div>
</template>

<script>
import top from './top'

export default {
  data() {
    return {
      user:{orgName:'南宁学院',depName:'信息工程学院',userName:'张三'},
      msgcount:7
    }
  },
  methods: {

  },
  components:{
    top
  }
}
</script>

<style>
  .box{
    padding-top: 50px;
    overflow-x: hidden;
  }
  .main{
    width: calc(100vw);
  }

  .main-enter{
	  opacity: 0;
	  transform: translateX(100%);/**进入时从右侧 */
  }
  .main-leave-to{
	  opacity: 0;
	  transform: translateX(-100%);/**离开时从左侧 */
	  position: absolute;/**解决动画时往上飘的问题 */
  }
  .main-enter-active,
  .main-leave-active{
	  transition: all 0.5s ease;
  }
</style>