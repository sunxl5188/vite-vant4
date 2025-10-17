<template>
  <van-field
    v-model="fieldText"
    is-link
    readonly
    :label="label"
    :placeholder="placeholder"
    input-align="right"
    required
    :rules="[{ required: true, message: '请填写用户名' }]"
    @click="handleShowPopup"
  />
  <van-calendar
    v-model:show="visible"
    switch-mode="month"
    @confirm="handleConfirm"
  />
</template>

<script setup lang="ts" name="CalendarIndex">
import dayjs from 'dayjs'

const props = defineProps({
  modelValue: { type: String, default: '' },
  label: { type: String, default: '日期' },
  placeholder: { type: String, default: '' },
  format: { type: String, default: 'll' },
  valueFormat: { type: String, default: 'YYYY/MM/DD' }
})
const emit = defineEmits(['update:modelValue'])

const state = reactive({
  fieldText: '',
  fieldValue: '',
  visible: false,
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
