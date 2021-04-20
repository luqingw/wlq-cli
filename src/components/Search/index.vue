<!--
 * @Description: search 组件
 * @Date: 2021-04-20 17:25:51
 * @LastEditors: luqing
 * @LastEditTime: 2021-04-20 17:26:12
-->

<template>
  <div>
    <el-input
      v-model="service"
      style="width: 200px"
      prefix-icon="el-icon-search"
      size="small"
      placeholder="请输入服务名称"
    >
    </el-input>
  </div>
</template>

<script>
export default {
  name: 'Search',
  props: {
    keyword: {
      type: String,
      default: ''
    }
  },
  computed: {
    service: {
      get () {
        return this.keyword
      },
      set (val) {
        this.$emit('change', val)
        return val
      }
    }
  }
}
</script>

<style lang="scss" scoped>
//  select 清除icon
/deep/ .el-select {
  .el-select__caret {
    &.el-icon-circle-close {
      font-size: 20px;
    }
  }
}
.select-wrap {
  font-size: 14px;
  color:#333;
}
</style>
