<template>
  <van-field
    v-model="fieldText"
    :label="label"
    required="auto"
    v-bind="state.getFieldValue"
    @click="handleShowPopup"
  />
  <van-calendar
    v-model:show="visible"
    v-bind="state.getBindValue"
    :default-date="state.defaultDate"
    @confirm="handleConfirm"
  />
</template>

<script setup lang="ts" name="CalendarIndex">
import dayjs from 'dayjs'

const props = defineProps({
  modelValue: { type: String, default: '' },
  label: { type: String, default: '' },
  format: { type: String, default: 'll' },
  valueFormat: { type: String, default: 'YYYY-MM-DD' },
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
const emit = defineEmits(['update:modelValue'])
const typeStyle = inject('typeStyle', 'line')
const state = reactive({
  fieldText: '',
  fieldValue: '',
  visible: false,
  getFieldValue: computed(() => {
    return {
      'is-link': typeStyle === 'line',
      rightIcon: typeStyle === 'line' ? 'arrow-right' : 'arrow-down',
      readonly: true,
      placeholder: '请选择日期',
      rules: [],
      ...props.fieldAttr
    }
  }),
  getBindValue: computed((): any => {
    return {
      title: '选择日期',
      'switch-mode': 'month',
      type: 'single',
      ...props.attr
    }
  }),
  defaultDate: computed(() => {
    const { type } = state.getBindValue
    const currDay = dayjs().toDate()
    if (type === 'single') {
      return props.modelValue ? dayjs(props.modelValue).toDate() : currDay
    }
    if (props.modelValue) {
      const dates = props.modelValue.split(',')
      return dates.map(item => dayjs(item).toDate())
    }
    return currDay
  }),
  handleShowPopup() {
    state.visible = true
  },
  handleConfirm(value: Date | Date[]) {
    if (state.getBindValue.type === 'single') {
      state.fieldText = dayjs(value as Date).format(props.format)
      state.fieldValue = dayjs(value as Date).format(props.valueFormat)
    } else {
      let separator = ','
      if (state.getBindValue.type === 'range') {
        separator = ' 至 '
      }
      state.fieldText = (value as Date[])
        .map(item => dayjs(item).format(props.format))
        .join(separator)
      state.fieldValue = (value as Date[])
        .map(item => dayjs(item).format(props.valueFormat))
        .join(',')
    }
    state.visible = false
    emit('update:modelValue', state.fieldValue)
  }
})

const { fieldText, visible, handleShowPopup, handleConfirm } = toRefs(state)

watch(
  () => props.modelValue,
  newVal => {
    if (newVal) {
      const { type } = state.getBindValue
      state.fieldValue = newVal
      if (type === 'single') {
        state.fieldText = dayjs(newVal).format(props.format)
      } else if (type === 'range') {
        const dates = newVal.split(',')
        state.fieldText = dates
          .map(item => dayjs(item).format(props.format))
          .join(' 至 ')
      } else {
        const dates = newVal.split(',')
        state.fieldText = dates
          .map(item => dayjs(item).format(props.format))
          .join(',')
      }
    }
  },
  { immediate: true }
)
</script>
