<template>
  <div class="list-group" >
      <a  v-for="(item,index) in dataList" :key="index" class="list-group-item item">
        <div>
          <h4 class="list-group-item-heading">{{item.title}}</h4>
          <p class="list-group-item-text">{{item.description}}</p>
        </div>
        <span class="time">{{item.date}}</span>
      </a>
    </div>
</template>

<script>
export default {
    props:['list'],
    data() {
        return {
            dataList:[]
        }
    },
    created() {
        this.dataList = this.list
    },
}
</script>

<style scoped>
  .item{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .time{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
</style>