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
      <van-date-picker v-model="state.startDate" v-bind="state.getBindStart" />
      <van-date-picker v-model="state.endDate" v-bind="state.getBindEnd" />
    </van-picker-group>
  </van-popup>
</template>

<script setup lang="ts" name="FieldDateRangeGroup">
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
  startDate: [] as string[],
  endDate: [] as string[],
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
      'min-date': dayjs(state.startDate.join('-') || undefined).toDate(),
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
  handleSetValue(startDate: string | undefined, endDate: string | undefined) {
    const startDates: string[] = dayjs(startDate)
      .format('YYYY-MM-DD')
      .split('-')
    const endDates: string[] = dayjs(endDate).format('YYYY-MM-DD').split('-')
    state.startDate = startDates
    state.endDate = endDates
  },
  //确认选择
  onConfirm() {
    const startDate = state.startDate.join('-')
    const endDate = state.endDate.join('-')
    const value = [
      dayjs(startDate).format('YYYY-MM-DD'),
      dayjs(endDate).format('YYYY-MM-DD')
    ]
    state.fieldText = value.join(' 至 ')
    emit('update:modelValue', value.join(','))
    state.onCancel()
  }
})

watch(
  () => props.modelValue,
  () => {
    if (props.modelValue) {
      const [startDate, endDate] = props.modelValue.split(',')
      state.fieldText = `${dayjs(startDate).format('YYYY-MM-DD')} 至 ${dayjs(
        endDate
      ).format('YYYY-MM-DD')}`
      state.handleSetValue(startDate, endDate)
    } else {
      state.fieldText = ''
      state.handleSetValue(undefined, undefined)
    }
  },
  { deep: true, immediate: true }
)

const { showPicker, onCancel, fieldText, handleShowPopup, onConfirm } =
  toRefs(state)
</script>
