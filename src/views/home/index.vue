<!--
 * @Description: home
 * @Date: 2021-04-20 16:54:46
 * @LastEditors: luqing
 * @LastEditTime: 2021-04-22 09:44:50
-->
<template>
  <div>
    <h1>{{ pageTitle }}</h1>
    <router-link to="/parent">点击进入 parent 页</router-link>
  </div>
</template>
<script>
export default {
  name: 'Home',
  data() {
    return {
      pageTitle: 'Home page'
    }
  }
}
</script>
