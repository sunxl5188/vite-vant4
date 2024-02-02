<template>
  <XlPopup v-model="visibleBoole" :attribute="popupAttribute">
    <van-picker
      :columns="columns"
      v-bind="_attribute"
      @cancel="handleCancel"
      @confirm="handleConfirm"
    ></van-picker>
  </XlPopup>
</template>

<script setup lang="ts" name="XlPicker">
import { ref, watch } from 'vue'
import type { PickerColumn, PickerFieldNames } from 'vant'
import city from '../utils/city'

interface PropsType {
  columns?: PickerColumn
  fieldNames?: PickerFieldNames
}
const props = withDefaults(defineProps<PropsType>(), {
  fieldNames: () => {
    return { text: 'label', value: 'value', children: 'children' }
  },
  columns: () => {
    return city
  }
})
const visibleBoole = ref<boolean>()
const visible = defineModel('visible', { type: Boolean, default: false })
const checkValue = defineModel({ type: Boolean, default: false })
const emit = defineEmits(['update:model-value', 'confirm'])

const popupAttribute = ref<object>({
  closeable: false
})

const _attribute = ref({
  ...{
    title: '请选择地区'
  },
  ...{ columnsFieldNames: props.fieldNames }
})

const handleCancel = (): void => {
  checkValue.value = false
}

const handleConfirm = ({
  selectedValues,
  selectedOptions,
  selectedIndexes
}): void => {
  emit('confirm', selectedValues, selectedOptions, selectedIndexes)
}

watch(
  () => visible.value,
  val => {
    visibleBoole.value = val
  },
  { deep: true, immediate: true }
)

// wathc=======================
</script>

<style scoped></style>
