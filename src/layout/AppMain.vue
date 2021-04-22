<!--
 * @Description: main
 * @LastEditors: luqing
 * @Author: luqing
 * @Date: 2021-04-21 20:21:20
 * @LastEditTime: 2021-04-22 09:19:45
-->
<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive>
        <router-view :key="key" class="app-container" />
      </keep-alive>
    </transition>
  </section>
</template>

<script>

export default {
  name: 'AppMain',
  computed: {
    key() {
      console.log('appmain path', this.$route.path)
      return this.$route.path
    }
  }
}
</script>

<style lang="scss" scoped>
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
