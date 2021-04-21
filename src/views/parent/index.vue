<!--
 * @Description: parent component
 * @LastEditors: luqing
 * @Author: luqing
 * @Date: 2021-04-21 17:37:59
 * @LastEditTime: 2021-04-21 19:45:56
-->
<template>
  <div class="parent-container">
    <h1>这里是 {{ pageTitle }}</h1>
    <router-link to="/home">  点击进入 home 页</router-link>
  </div>
</template>
<script>
export default {
  name: 'Parent',
  data() {
    return {
      pageTitle: 'parent page'
    }
  }
}
</script>
<style lang="scss" scoped>
.parent-container {
  border: 1px solid #00f;
}
</style>
