<template>
  <van-field
    v-model="fieldText"
    :label="label"
    required="auto"
    v-bind="state.getFieldValue"
    @click="handleShowPopup"
  />
  <van-popup v-model:show="showPicker" destroy-on-close round position="bottom">
    <van-time-picker
      v-model="state.time"
      v-bind="state.getBindValue"
      @cancel="onCancel"
      @confirm="onConfirm"
    />
  </van-popup>
</template>

<script setup lang="ts" name="FieldTime">
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
const typeStyle = inject('typeStyle', 'line')
const state = reactive({
  showPicker: false,
  fieldText: '',
  time: [] as Array<string>,
  getFieldValue: computed(() => {
    return {
      'is-link': typeStyle === 'line',
      rightIcon: typeStyle === 'line' ? 'arrow-right' : 'arrow-down',
      readonly: true,
      placeholder: '请选择时间',
      rules: [],
      ...props.fieldAttr
    }
  }),
  getBindValue: computed(() => {
    return {
      title: '请选择时间',
      ...props.attr
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
  handleSetValue(value?: string) {
    const [hour, minute]: string[] = dayjs().format('HH:mm').split(':')
    state.time = value ? value.split(':') : [hour || '0', minute || '0']
  },
  //确认选择
  onConfirm() {
    const value = state.time.join(':')
    state.fieldText = value
    emit('update:modelValue', value)
    state.onCancel()
  }
})

watch(
  () => props.modelValue,
  () => {
    if (props.modelValue) {
      state.fieldText = props.modelValue
      state.handleSetValue(props.modelValue)
    } else {
      state.fieldText = ''
      state.handleSetValue()
    }
  },
  { immediate: true }
)

const { showPicker, onCancel, fieldText, handleShowPopup, onConfirm } =
  toRefs(state)
</script>
