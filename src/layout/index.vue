<!--
 * @Description:layout
 * @Date: 2021-04-20 16:08:28
 * @LastEditors: luqing
 * @LastEditTime: 2021-04-21 20:29:23
-->
<template>
  <div class="app-wrapper">
    <router-view>
      <AppMain />
    </router-view>
  </div>
</template>

<script>
import AppMain from './components/AppMain'
export default {
  name: 'Layout',
  components: {
    AppMain
  },
  data() {
    return {

    }
  }
}
</script>
<style lang="scss" scoped>
.app-wrapper {
  border: 1px solid #ff0;
  height: 100%;
}
</style>
