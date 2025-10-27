<template>
  <van-field
    v-model="fieldText"
    :label="label"
    :placeholder="placeholder"
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

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  label: { type: String, default: '选择器' },
  placeholder: { type: String, default: '请选择' },
  columns: {
    type: Array as PropType<PickerColumn>,
    default: () => [
      {
        text: '浙江',
        value: 'Zhejiang',
        children: [
          {
            text: '杭州',
            value: 'Hangzhou',
            children: [
              { text: '西湖区', value: 'Xihu' },
              { text: '余杭区', value: 'Yuhang' }
            ]
          },
          {
            text: '温州',
            value: 'Wenzhou',
            children: [
              { text: '鹿城区', value: 'Lucheng' },
              { text: '瓯海区', value: 'Ouhai' }
            ]
          }
        ]
      },
      {
        text: '福建',
        value: 'Fujian',
        children: [
          {
            text: '福州',
            value: 'Fuzhou',
            children: [
              { text: '鼓楼区', value: 'Gulou' },
              { text: '台江区', value: 'Taijiang' }
            ]
          },
          {
            text: '厦门',
            value: 'Xiamen',
            children: [
              { text: '思明区', value: 'Siming' },
              { text: '海沧区', value: 'Haicang' }
            ]
          }
        ]
      }
    ]
  },
  api: {
    type: String,
    default: ''
  },
  params: {
    type: Object as PropType<{ [key: string]: any }>,
    default: () => ({})
  },
  columnsFieldNames: {
    type: Object as PropType<PickerFieldNames>,
    default: () => ({
      text: 'text',
      value: 'value',
      children: 'children'
    })
  },
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
  pickerValue: [] as string[],
  sourceData: [] as PickerColumn,
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
      title: '请选择',
      'columns-field-names': props.columnsFieldNames,
      ...props.attributes
    }
  }),
  //显示选择器
  handleShowPopup() {
    state.showPicker = true
  },
  //获取显示文本
  handleQueryText() {
    const texts: string[] = []
    const { text, children } = props.columnsFieldNames
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
    const { text } = props.columnsFieldNames
    state.showPicker = false
    state.pickerValue = selectedValues
    state.fieldText = selectedOptions
      .map((o: PickerOption) => o[text || 'text'])
      .join('/')
    emit('update:modelValue', selectedValues.join(','))
    emit('update:text', state.fieldText)
  }
})

onBeforeMount(async () => {
  if (props.api) {
    //这里可以根据传入的api请求数据
    const { code, data } = await fetch(props.api, { ...props.params })
    if (code === 200) {
      state.sourceData = data
    }
  } else if (props.columns?.length) {
    state.sourceData = props.columns
  }
})

watch(
  () => [props.modelValue, state.sourceData],
  () => {
    if (props.modelValue) {
      const value = props.modelValue.split(',')
      state.pickerValue = value
      if (state.sourceData.length) {
        state.handleQueryText()
      }
    }
  },
  { immediate: true }
)

const { showPicker, fieldText, pickerValue, handleShowPopup, onConfirm } =
  toRefs(state)
</script>
