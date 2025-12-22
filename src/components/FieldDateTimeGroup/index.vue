<template>
  <van-field
    v-model="fieldText"
    :label="label"
    required="auto"
    v-bind="getFieldValue(type, fieldAttr)"
    @click="handleShowPopup"
  />
  <van-popup v-model:show="showPicker" destroy-on-close round position="bottom">
    <van-picker-group
      v-bind="state.getBindValue"
      @confirm="onConfirm"
      @cancel="onCancel"
    >
      <van-date-picker
        v-model="state.currentDate"
        v-bind="state.getBindDateAttr"
      />
      <van-time-picker
        v-model="state.currentTime"
        v-bind="state.getBindTimeAttr"
      />
    </van-picker-group>
  </van-popup>
</template>

<script setup lang="ts" name="FieldDateTimeGroup">
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
  },
  dateAttr: {
    type: Object as PropType<Record<string, unknown>>,
    default: () => ({})
  },
  timeAttr: {
    type: Object as PropType<Record<string, unknown>>,
    default: () => ({})
  }
})

const emit = defineEmits(['update:modelValue', 'update:text'])
const type = inject('type', 'line')
const state = reactive({
  showPicker: false,
  fieldText: '',
  currentDate: [] as string[],
  currentTime: [] as string[],
  getBindValue: computed(() => {
    return {
      title: '预约日期',
      tabs: ['选择日期', '选择时间'],
      'next-step-text': '下一步',
      ...props.attr
    }
  }),
  getBindDateAttr: computed(() => {
    return {
      formatter: (type: string, option: PickerOption) => {
        if (type === 'year') {
          option.text += '年'
        }
        if (type === 'month') {
          option.text += '月'
        }
        return option
      },
      ...props.dateAttr
    }
  }),
  getBindTimeAttr: computed(() => {
    return {
      ...props.timeAttr
    }
  }),
  //显示选择器
  handleShowPopup() {
    state.showPicker = true
  },
  //取消选择
  onCancel() {
    state.showPicker = false
  },
  //设置值
  handleSetValue(value: string | undefined) {
    const currentDate: string[] = dayjs(value).format('YYYY-MM-DD').split('-')
    const currentTime = dayjs(value).format('HH:mm').split(':')
    state.currentDate = currentDate
    state.currentTime = currentTime
  },
  //确认选择
  onConfirm() {
    const date = state.currentDate.join('-')
    const time = state.currentTime.join(':')
    const value = `${date} ${time}`
    state.fieldText = dayjs(value).format('lll')
    emit('update:modelValue', dayjs(value).format('YYYY-MM-DD HH:mm:ss'))
    state.onCancel()
  }
})

watch(
  () => props.modelValue,
  () => {
    if (props.modelValue) {
      const value = props.modelValue
      state.fieldText = dayjs(value).format('lll')
      state.handleSetValue(value)
    } else {
      state.fieldText = ''
      state.handleSetValue(undefined)
    }
  },
  { deep: true, immediate: true }
)

const { showPicker, onCancel, fieldText, handleShowPopup, onConfirm } =
  toRefs(state)
</script>
