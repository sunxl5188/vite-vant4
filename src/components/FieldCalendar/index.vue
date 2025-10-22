<template>
  <van-field
    v-model="fieldText"
    :label="label"
    :placeholder="placeholder"
    v-bind="state.getFieldValue"
    @click="handleShowPopup"
  />
  <van-calendar
    v-model:show="visible"
    v-bind="state.getBindValue"
    @confirm="handleConfirm"
  />
</template>

<script setup lang="ts" name="CalendarIndex">
import dayjs from 'dayjs'

const props = defineProps({
  modelValue: { type: String, default: '' },
  label: { type: String, default: '日期' },
  placeholder: { type: String, default: '请选择' },
  format: { type: String, default: 'll' },
  valueFormat: { type: String, default: 'YYYY/MM/DD' },
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
const emit = defineEmits(['update:modelValue'])

const state = reactive({
  fieldText: '',
  fieldValue: '',
  visible: false,
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
      title: '选择日期',
      'switch-mode': 'month',
      ...props.attributes
    }
  }),
  handleShowPopup() {
    state.visible = true
  },
  handleConfirm(value: Date) {
    state.visible = false
    state.fieldText = dayjs(value).format(props.format)
    state.fieldValue = dayjs(value).format(props.valueFormat)
    emit('update:modelValue', state.fieldValue)
  }
})

const { fieldText, visible, handleShowPopup, handleConfirm } = toRefs(state)

watch(
  () => props.modelValue,
  newVal => {
    if (newVal) {
      state.fieldValue = newVal
      state.fieldText = dayjs(newVal).format(props.format)
    }
  },
  { immediate: true }
)
</script>
