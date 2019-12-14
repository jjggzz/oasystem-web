<template>
  <el-container>
      <el-calendar h v-model="value"></el-calendar>
  </el-container>
</template>

<script>
export default {
    data() {
        return {
            value: new Date()
        }
    },
}
</script>

<style>

</style>