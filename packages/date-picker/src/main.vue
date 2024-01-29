<template>
  <van-date-picker
    v-model="currentDate"
    v-bind="_attribute"
    @change="handleChange"
    @confirm="handleConfirm"
    @cancel="handleCancel"
  ></van-date-picker>
</template>

<script setup lang="ts" name="XlDatePicker">
import { ref, getCurrentInstance } from 'vue'
import type { PickerOption } from 'vant'

const { proxy } = getCurrentInstance() as any

const currentDate = defineModel<string[]>()
const emit = defineEmits(['update:model-value', 'confirm', 'cancel'])

const formatter = (type: string, option: PickerOption): PickerOption => {
  if (type === 'year') {
    option.text += '年'
  }
  if (type === 'month') {
    option.text += '月'
  }
  if (type === 'day') {
    option.text += '日'
  }
  return option
}

const _attribute = ref({
  title: '选择日期',
  'columns-type': ['year', 'month', 'day'],
  'min-date': proxy.$dayjs().subtract(10, 'year').toDate(),
  'max-date': proxy.$dayjs().add(5, 'year').toDate(),
  'show-toolbar': true,
  formatter
})

const handleChange = () => {
  //emit('update:model-value', currentDate)
}
const handleConfirm = () => {}

const handleCancel = () => {}
</script>

<style scoped></style>
