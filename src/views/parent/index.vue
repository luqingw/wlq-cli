<!--
 * @Description: parent component
 * @LastEditors: luqing
 * @Author: luqing
 * @Date: 2021-04-21 17:37:59
 * @LastEditTime: 2021-04-22 09:44:31
-->
<template>
  <div class="parent-container">
    <h1>这里是 {{ pageTitle }}</h1>
    <router-link to="/home">  点击进入 home 页</router-link><br>
    <router-link to="/parent/child1">  点击进入 child1 页</router-link><br>
    <router-link to="/parent/child2">  点击进入 child2 页</router-link>
    <Child1 />
    <Child2 />
  </div>
</template>
<script>
import Child1 from '@/views/child1'
import Child2 from '@/views/child2'
export default {
  name: 'Parent',
  components: {
    Child1,
    Child2
  },
  data() {
    return {
      pageTitle: 'parent page'
    }
  }
}
</script>
<style lang="scss" scoped>
// .parent-container {
//   border: 1px solid #00f;
//   height: 100%;
// }
</style>
