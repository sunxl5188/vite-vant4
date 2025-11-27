<template>
  <van-field
    v-model="fieldText"
    :label="label"
    required="auto"
    v-bind="getFieldValue(type, fieldAttr)"
    @click="handleShowPopup"
  />

  <van-popup v-model:show="showPicker" destroy-on-close round position="bottom">
    <van-date-picker
      v-model="pickerValue"
      :formatter="state.formatter"
      v-bind="state.getBindValue"
      @cancel="showPicker = false"
      @confirm="onConfirm"
    />
  </van-popup>
</template>

<script setup lang="ts" name="FieldDate">
import type { PickerOption } from 'vant'
import { getFieldValue } from '@/components/BaseForm/common'
import dayjs from 'dayjs'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  label: { type: String, default: '' },
  //输入框属性
  fieldAttr: {
    type: Object as PropType<Record<string, unknown>>,
    default: () => ({})
  },
  //弹窗属性
  attr: {
    type: Object as PropType<Record<string, unknown>>,
    default: () => ({})
  }
})

const emit = defineEmits(['update:modelValue', 'update:text'])
const type = inject('type', 'line')
const state = reactive({
  pickerRef: ref<any>(null),
  showPicker: false,
  fieldText: '',
  pickerValue: [] as string[],
  getBindValue: computed(() => {
    return {
      title: '请选择日期',
      ...props.attr
    }
  }),
  formatter: (type: string, option: PickerOption) => {
    if (type === 'year') {
      option.text += '年'
    }
    if (type === 'month') {
      option.text += '月'
    }
    return option
  },
  //显示选择器
  handleShowPopup() {
    state.showPicker = true
  },
  //确认选择
  onConfirm({ selectedValues }: { selectedValues: string[] }) {
    const value = selectedValues.join(',').replace(/,/g, '-')
    state.fieldText = dayjs(value).format('LL')
    emit('update:modelValue', value)
    state.showPicker = false
  }
})

watch(
  () => props.modelValue,
  () => {
    if (props.modelValue) {
      const value = props.modelValue.split('-')
      state.pickerValue = value
      state.fieldText = dayjs(props.modelValue).format('ll')
    } else {
      state.pickerValue = dayjs().format('YYYY-MM-DD').split('-')
    }
  },
  { immediate: true }
)

const { showPicker, fieldText, pickerValue, handleShowPopup, onConfirm } =
  toRefs(state)
</script>
