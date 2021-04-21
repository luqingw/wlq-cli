/*
 * @Description: dialog
 * @Date: 2021-04-20 16:12:12
 * @LastEditors: luqing
 * @LastEditTime: 2021-04-20 16:12:35
 */
export default {
  name: 'DialogParams',
  props: {
    dialogTitle: { type: String, default: '' },
    isDialogVisible: { type: Boolean, default: false }
  },
  data() {
    return {
      dialogVisible: this.isDialogVisible
    }
  },
  watch: {
    isDialogVisible: {
      immediate: true,
      handler(newV) {
        this.dialogVisible = newV
      }
    }
  },
  methods: {

    /* close dialog */
    OnClose() {
      this.$emit('update:is-dialog-visible', false)
      // 表单的话需要做重置表单的操作
    }
  }
}
