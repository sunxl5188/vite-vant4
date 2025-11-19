<template>
  <van-field
    v-model="fieldText"
    :label="label"
    required="auto"
    v-bind="state.getFieldValue"
    @click="handleShowPopup"
  />
  <van-popup v-model:show="showPicker" destroy-on-close round position="bottom">
    <van-picker
      v-model="pickerValue"
      :columns="state.sourceData"
      v-bind="state.getBindValue"
      @cancel="showPicker = false"
      @confirm="onConfirm"
    />
  </van-popup>
</template>

<script setup lang="ts" name="FieldPicker">
import type { PickerColumn, PickerOption, PickerFieldNames } from 'vant'
import { fetch } from '@/utils/request'
import { useUserStore } from '@/store/useUserStore'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  label: { type: String, default: '' },
  // 选项数据
  columns: {
    type: Array as PropType<PickerColumn>,
    default: () => []
  },
  // 字典类型
  dict: { type: String, default: '' },
  // 接口地址
  api: { type: String, default: '' },
  // 接口参数
  params: { type: Object, default: () => ({}) },
  // 字段映射
  fieldNames: {
    type: Object,
    default: () => ({
      text: 'text',
      value: 'value',
      children: 'children'
    })
  },
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

const userStore = useUserStore()
const emit = defineEmits(['update:modelValue', 'update:text'])

const state = reactive({
  showPicker: false,
  fieldText: '',
  pickerValue: [] as string[],
  sourceData: [] as PickerColumn,
  getFieldValue: computed(() => {
    return {
      'is-link': true,
      readonly: true,
      placeholder: '请选择',
      rules: [],
      ...props.fieldAttr
    }
  }),
  getBindValue: computed(() => {
    return {
      title: '请选择',
      columnsFieldNames: props.fieldNames,
      ...props.attr
    }
  }),
  //显示选择器
  handleShowPopup() {
    state.showPicker = true
  },
  //获取显示文本
  handleQueryText() {
    const texts: string[] = []
    const { text, children } = props.fieldNames
    const loopText = (data: PickerOption[]) => {
      data.some((item: PickerOption) => {
        if (state.pickerValue.includes(item.value as string)) {
          texts.push(item[text || 'text'] as string)
          if (item[children || 'children']?.length) {
            loopText(item[children || 'children'])
          }
          return true
        }
      })
    }
    loopText(state.sourceData as PickerOption[])
    state.fieldText = texts.join('/')
  },
  //确认选择
  onConfirm({
    selectedValues,
    selectedOptions
  }: {
    selectedValues: string[]
    selectedOptions: PickerOption[]
  }) {
    const { text } = props.fieldNames as PickerFieldNames
    state.showPicker = false
    state.pickerValue = selectedValues
    state.fieldText = selectedOptions
      .map((o: PickerOption) => o[text || 'text'])
      .join('/')
    emit('update:modelValue', selectedValues.join(','))
    emit('update:text', state.fieldText)
  },
  // 加载数据
  async handleLoad() {
    const { code, data } = await fetch(props.api, props.params)
    if (code === 200) {
      state.sourceData = data
    }
  }
})

onMounted(() => {
  if (props.dict) {
    state.sourceData = userStore.dictData[props.dict]
  } else if (props.api) {
    state.handleLoad()
  } else {
    state.sourceData = props.columns || []
  }
})

watch(
  () => [props.modelValue, state.sourceData],
  () => {
    if (props.modelValue && state.sourceData?.length) {
      const value = props.modelValue.split(',')
      state.pickerValue = value
      state.handleQueryText()
    }
  },
  { immediate: true, deep: true }
)

const { showPicker, fieldText, pickerValue, handleShowPopup, onConfirm } =
  toRefs(state)
</script>
