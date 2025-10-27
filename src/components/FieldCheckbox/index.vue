<template>
  <van-checkbox-group
    v-model="state.checkboxValue"
    @change="state.handleChange"
  >
    <van-cell-group>
      <van-cell
        v-for="(item, index) in state.sourceData"
        :key="item"
        clickable
        :title="item[fieldNames.text || 'text']"
        @click="state.handleToggle(index)"
      >
        <template #right-icon>
          <van-checkbox
            :ref="el => (state.checkboxes[index] = el)"
            :name="item[fieldNames.value || 'value']"
          />
        </template>
      </van-cell>
    </van-cell-group>
  </van-checkbox-group>
</template>

<script setup lang="ts" name="FieldCheckbox">
import { dictApi } from '@/utils'
import { fetch } from '@/utils/request'

const props = defineProps({
  // 绑定值
  modelValue: {
    type: Array as () => string[],
    default: () => []
  },
  // 绑定文本值
  text: {
    type: Array as () => string[],
    default: () => []
  },
  // 选项数据
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
  checkboxes: ref<any[]>([]), // 复选框组件列表
  checkboxValue: [] as Array<string>, //选中值
  checkboxText: [] as Array<string>, //选中文本
  sourceData: [] as any[], // 数据源
  // 切换选中
  async handleToggle(index: number) {
    state.checkboxes[index]?.toggle()
    await nextTick()
    state.handleLoad()
  },
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
    const selectedOptions = state.sourceData.filter(item =>
      state.checkboxValue.includes(item[props.fieldNames.value || 'value'])
    )
    state.checkboxText = selectedOptions.map(
      item => item[props.fieldNames.text || 'text']
    )
    emit('update:text', state.checkboxText)
  },
  // 处理值变化
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
      state.checkboxValue = val
      state.handleGetText()
    }
  },
  { immediate: true }
)
</script>
