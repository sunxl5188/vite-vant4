<template>
  <van-radio-group v-model="state.checkboxValue" @change="state.handleChange">
    <van-cell
      v-for="(item, i) in state.sourceData"
      :key="i"
      :title="item[fieldNames.text || 'text']"
      clickable
      @click="state.checkboxValue = item[fieldNames.value || 'value']"
    >
      <template #right-icon>
        <van-radio :name="item[fieldNames.value || 'value']" />
      </template>
    </van-cell>
  </van-radio-group>
</template>

<script setup lang="ts" name="FieldRadio">
import { dictApi } from '@/utils'
import { fetch } from '@/utils/request'

const props = defineProps({
  // 绑定值
  modelValue: {
    type: String,
    default: ''
  },
  // 绑定文本值
  text: {
    type: String,
    default: ''
  },
  options: { type: Array, default: () => [] },
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
      value: 'value'
    })
  }
})

const emit = defineEmits(['update:modelValue', 'update:text'])

const state = reactive({
  checkboxValue: '' as string, //选中值
  checkboxText: '' as string, //选中文本
  sourceData: [] as any[], // 数据源
  // 加载数据
  async handleLoad() {
    let apiUrl = ''
    let params
    if (props.dict) {
      apiUrl = dictApi
      params = { type: props.dict }
    } else if (props.api) {
      apiUrl = props.api
      params = { type: props.params }
    }
    const { code, data } = await fetch(apiUrl, params)
    if (code === 200) {
      state.sourceData = data
    }
  },
  // 获取文本值
  handleGetText() {
    const selectedOptions = state.sourceData.filter(item => {
      const v = item[props.fieldNames.value || 'value']
      return state.checkboxValue === v
    })
    if (selectedOptions[0]) {
      state.checkboxText = selectedOptions[0][props.fieldNames.text || 'text']
      emit('update:text', state.checkboxText)
    }
  },
  // 值变化
  handleChange() {
    emit('update:modelValue', state.checkboxValue)
  }
})

onMounted(() => {
  if (props.api || props.dict) {
    state.handleLoad()
  } else {
    state.sourceData = props.options
  }
})

watch(
  () => [props.modelValue, state.sourceData],
  ([val, data]) => {
    if (val && data?.length) {
      state.checkboxValue = val as string
      state.handleGetText()
    }
  },
  { immediate: true }
)
</script>
