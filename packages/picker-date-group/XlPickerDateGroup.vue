<template>
  <XlPickerGroup
    v-model="visible"
    :attribute="attribute"
    @confirm="handleConfirm"
  >
    <template #tab1> 111 </template>
    <template #tab2> 111 </template>
  </XlPickerGroup>
</template>

<script setup lang="ts" name="XlPickerDateGroup">
import XlPickerGroup from '../picker-group/index'
import { ref } from 'vue'

interface PropsType {
  tabs?: string[]
}
const props = withDefaults(defineProps<PropsType>(), {
  tabs: () => {
    return []
  }
})

const attribute = ref({
  ...{
    tabs: ['开始日期', '结束日期']
  },
  ...props.tabs
})

const visible = defineModel({ type: Boolean, default: false })
const emit = defineEmits(['update:model-value', 'confirm'])

const handleConfirm = (): void => {
  emit('')
}
</script>

<style scoped></style>
