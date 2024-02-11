<template>
  <XlPopup v-model="visible" v-bind="popupAttribute">
    <van-date-picker
      v-model="checkValue"
      v-bind="_attribute"
      @change="handleChange"
      @confirm="handleConfirm"
      @cancel="handleCancel"
    ></van-date-picker>
  </XlPopup>
</template>

<script setup lang="ts" name="XlDatePicker">
import useCurrentInstance from '@/utils/useCurrentInstance'
import XlPopup from '../popup'
import type { PickerOption } from 'vant'

const { proxy } = useCurrentInstance()
const popupAttribute = ref<object>({
  closeable: false
})

const visible = defineModel()
const emit = defineEmits(['update:model-value', 'change', 'confirm', 'cancel'])

const checkValue = ref<string[]>(new Array(3))

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
  const date = proxy
    .$dayjs([
      checkValue.value[0],
      Number(checkValue.value[1]) - 1,
      checkValue.value[2],
      0,
      0,
      0,
      0
    ])
    .format('YYYY-MM-DD')
  emit('change', date)
}
const handleConfirm = () => {
  emit(
    'confirm',
    proxy
      .$dayjs([
        checkValue.value[0],
        Number(checkValue.value[1]) - 1,
        checkValue.value[2],
        0,
        0,
        0,
        0
      ])
      .format('YYYY-MM-DD')
  )
}

const handleCancel = () => {
  emit('update:model-value', false)
  emit('cancel')
}

onMounted(() => {
  checkValue.value = proxy.$dayjs().format('YYYY-MM-DD').split('-')
})
</script>

<style scoped></style>
