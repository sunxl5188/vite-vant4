<template>
  <XlPopup
    v-model="visible"
    v-bind="{ ...{ closeable: false, style: { height: '55%' } }, ...popupAttr }"
  >
    <van-picker-group
      v-model:active-tab="activeTab"
      v-bind="_attribute"
      @confirm="handleConfirm"
      @cancel="handleCancel"
    >
      <slot name="tab1"></slot>
      <slot name="tab2"></slot>
      <slot name="tab3"></slot>
      <slot name="tab4"></slot>
      <slot name="tab5"></slot>
      <slot name="tab6"></slot>
      <slot name="tab7"></slot>
      <slot name="tab8"></slot>
      <slot name="tab9"></slot>
    </van-picker-group>
  </XlPopup>
</template>

<script setup lang="ts" name="XlPickerGroup">
interface PropsType {
  popupAttr?: object
  attribute?: object
}

const props = withDefaults(defineProps<PropsType>(), {
  popupAttr: () => {
    return {}
  },
  attribute: () => {
    return {}
  }
})

const _attribute = ref({
  ...{
    title: '选择日期',
    tabs: ['选择日期', '选择时间'],
    nextStepText: '',
    confirmButtonText: '确定',
    cancelButtonText: '取消'
  },
  ...props.attribute
})

const activeTab = ref<number>(0)

const visible = defineModel()
const emit = defineEmits(['update:model-value', 'confirm', 'cancel'])

const handleConfirm = (): void => {
  emit('confirm')
}
const handleCancel = (): void => {
  emit('cancel')
}

defineExpose({ activeTab })
</script>

<style scoped></style>
