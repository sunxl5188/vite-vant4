<template>
  <XlPopup
    v-model="visible"
    v-bind="{ ...{ closeable: false, style: { height: '65%' } }, ...popupAttr }"
  >
    <van-picker-group
      v-model:active-tab="activeTab"
      v-bind="_attribute"
      @confirm="handleConfirm"
      @cancel="handleCancel"
    >
      <template v-for="(item, i) of _attribute.tabs">
        <slot :name="`tab${i + 1}`">{{ i }}</slot>
      </template>
    </van-picker-group>
  </XlPopup>
</template>

<script setup lang="ts" name="XlPickerGroup">
import { ref } from 'vue'
import type { PickerGroupProps } from 'vant'

const activeTab = ref<number>(0)

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

const _attribute = ref<PickerGroupProps>({
  ...{
    title: '选择日期',
    tabs: ['选择日期', '选择时间'],
    nextStepText: '',
    confirmButtonText: '确定',
    cancelButtonText: '取消'
  },
  ...props.attribute
})

const visible = defineModel()
const emit = defineEmits(['update:model-value', 'confirm'])

const handleConfirm = (): void => {
  emit('confirm')
}
const handleCancel = (): void => {
  emit('update:model-value', false)
}
</script>

<style scoped></style>
