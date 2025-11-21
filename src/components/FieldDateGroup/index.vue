<template>
  <van-field
    v-model="fieldText"
    :label="label"
    required="auto"
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

<script setup lang="ts" name="FieldDateGroup">
import dayjs from 'dayjs'

const props = defineProps({
  modelValue: {
    type: Array as PropType<string[]>,
    default: () => {
      return []
    }
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
  //日期选择器属性
  startAttr: {
    type: Object as PropType<Record<string, unknown>>,
    default: () => ({})
  },
  //日期选择器属性
  endAttr: {
    type: Object as PropType<Record<string, unknown>>,
    default: () => ({})
  }
})

const emit = defineEmits(['update:modelValue', 'update:text'])
const typeStyle = inject('typeStyle', 'line')
const state = reactive({
  showPicker: false,
  fieldText: '',
  startDate: [] as string[],
  endDate: [] as string[],
  getFieldValue: computed(() => {
    return {
      'is-link': typeStyle === 'line',
      rightIcon: typeStyle === 'line' ? 'arrow-right' : 'arrow-down',
      readonly: true,
      rules: [],
      ...props.fieldAttr
    }
  }),
  getBindValue: computed(() => {
    return {
      title: '预约日期',
      tabs: ['选择开始日期', '选择结束日期'],
      'next-step-text': '下一步',
      ...props.attr
    }
  }),
  getBindStart: computed(() => {
    return {
      ...props.startAttr
    }
  }),
  getBindEnd: computed((): any => {
    return {
      'min-date': dayjs(state.startDate.join('-') || undefined).toDate(),
      ...props.endAttr
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
    state.fieldText = value.join('至')
    emit('update:modelValue', value)
    state.onCancel()
  }
})

watch(
  () => props.modelValue,
  () => {
    if (props.modelValue?.length) {
      const [startDate, endDate] = props.modelValue
      state.fieldText = `${dayjs(startDate).format('YYYY-MM-DD')}至${dayjs(
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
