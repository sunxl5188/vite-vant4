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
      <van-time-picker v-model="state.startTime" v-bind="state.getBindStart" />
      <van-time-picker v-model="state.endTime" v-bind="state.getBindEnd" />
    </van-picker-group>
  </van-popup>
</template>

<script setup lang="ts" name="FieldTimeGroup">
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
  },
  //日期选择器属性
  startAttributes: {
    type: Object as PropType<Record<string, unknown>>,
    default: () => ({})
  },
  //日期选择器属性
  endAttributes: {
    type: Object as PropType<Record<string, unknown>>,
    default: () => ({})
  }
})

const emit = defineEmits(['update:modelValue', 'update:text'])

const state = reactive({
  showPicker: false,
  fieldText: '',
  startTime: ['0', '0'] as Array<string>,
  endTime: ['0', '0'] as Array<string>,
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
      tabs: ['选择开始日期', '选择结束日期'],
      'next-step-text': '下一步',
      ...props.attributes
    }
  }),
  getBindStart: computed(() => {
    return {
      ...props.startAttributes
    }
  }),
  getBindEnd: computed((): any => {
    return {
      'min-hour': state.startTime.length ? state.startTime[0] : '0',
      'min-minute': state.startTime.length ? state.startTime[1] : '0',
      ...props.endAttributes
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
  handleSetValue(startTime?: string, endTime?: string) {
    const currentTime: string[] = dayjs().format('HH:mm').split(':')
    const defaultArr = [currentTime[0] || '0', currentTime[1] || '0']
    state.startTime = startTime ? startTime.split(':') : defaultArr
    state.endTime = endTime ? endTime.split(':') : defaultArr
  },
  //确认选择
  onConfirm() {
    const startTime = state.startTime.join(':')
    const endTime = state.endTime.join(':')
    const value = [startTime, endTime]
    state.fieldText = value.join(' 至 ')
    emit('update:modelValue', value.join(','))
    state.onCancel()
  }
})

watch(
  () => props.modelValue,
  () => {
    if (props.modelValue) {
      const [startTime, endTime] = props.modelValue.split(',')
      state.fieldText = `${startTime} 至 ${endTime}`
      state.handleSetValue(startTime || '', endTime || '')
    } else {
      state.fieldText = ''
      state.handleSetValue()
    }
  },
  { deep: true, immediate: true }
)

const { showPicker, onCancel, fieldText, handleShowPopup, onConfirm } =
  toRefs(state)
</script>
