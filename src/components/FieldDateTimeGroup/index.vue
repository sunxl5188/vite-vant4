<template>
  <van-field
    v-model="fieldText"
    :label="label"
    :placeholder="placeholder"
    v-bind="state.getFieldValue"
    @click="handleShowPopup"
  />
  <van-popup v-model:show="showPicker" destroy-on-close round position="bottom">
    <van-picker-group
      v-bind="state.getBindValue"
      @confirm="onConfirm"
      @cancel="onCancel"
    >
      <van-date-picker v-model="state.currentDate" />
      <van-time-picker v-model="state.currentTime" />
    </van-picker-group>
  </van-popup>
</template>

<script setup lang="ts" name="FieldDateTimeGroup">
import dayjs from 'dayjs'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  label: { type: String, default: '选择器' },
  placeholder: { type: String, default: '请选择' },
  //输入框属性
  fieldAttributes: {
    type: Object as PropType<Record<string, unknown>>,
    default: () => ({})
  },
  //弹窗属性
  attributes: {
    type: Object as PropType<Record<string, unknown>>,
    default: () => ({})
  }
})

const emit = defineEmits(['update:modelValue', 'update:text'])

const state = reactive({
  showPicker: false,
  fieldText: '',
  currentDate: [] as string[],
  currentTime: [] as string[],
  getFieldValue: computed(() => {
    return {
      'is-link': true,
      readonly: true,
      'input-align': 'right',
      required: false,
      rules: [],
      ...props.fieldAttributes
    }
  }),
  getBindValue: computed(() => {
    return {
      title: '预约日期',
      tabs: ['选择日期', '选择时间'],
      'next-step-text': '下一步',
      ...props.attributes
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
