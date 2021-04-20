<!--
 * @Description: select 组件封装
 * @Date: 2021-04-20 17:24:20
 * @LastEditors: luqing
 * @LastEditTime: 2021-04-20 17:24:56
-->
<template>
  <div>
    <span v-show="haveLabelText" :class="spanClass" class="label label-width60">{{ labelText }}</span>
    <el-select v-model="value" :clearable="clearable" :style="{ width: width }" :size="size" :placeholder="placeholder">
      <el-option
        v-for="(item, index) in list"
        :key="index"
        :label=" item.value || item"
        :value=" item.name || item"
      >
      </el-option>
    </el-select>
  </div>

</template>

<script>
export default {
  name: 'Select',
  props: {
    spanClass: { type: String, default: '' },
    labelText: {
      type: String,
      default: '命名空间'
    },
    placeholder: {
      type: String,
      default: '选择命名空间'
    },
    list: {
      type: Array,
      default: null
    },
    parentValue: {
      type: String,
      default: ''
    },
    haveLabelText: {
      type: Boolean,
      default: true
    },
    clearable: {
      type: Boolean,
      default: true
    },
    width: {
      type: String,
      default: '200px'
    },
    size: {
      type: String,
      default: 'small'
    }
  },
  computed: {
    value: {
      get () {
        return this.parentValue
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
.ns-select-wrap {
  font-size: 14px;
  color:#333;
}
</style>

