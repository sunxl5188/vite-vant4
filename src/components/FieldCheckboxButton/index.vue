<template>
  <van-field :label="label" required="auto" v-bind="state.getFieldValue">
    <template #input></template>
  </van-field>
  <div
    class="flex justify-start items-start flex-wrap px-4 pt-[10px]"
    style="border-bottom: 1px solid var(--van-cell-border-color)"
  >
    <div
      v-for="(item, i) in state.sourceData"
      :key="i"
      class="checkboxButton"
      :class="state.isActive(item[fieldNames.value || 'value'])"
      @click="state.handleSelect(item)"
    >
      {{ item[fieldNames.text || 'text'] }}
    </div>
  </div>
</template>

<script setup lang="ts" name="FieldCheckboxButton">
import { dictApi } from '@/utils'
import { fetch } from '@/utils/request'

const props = defineProps({
  label: {
    type: String,
    default: ''
  },
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
  },
  //输入框属性
  fieldAttr: {
    type: Object as PropType<Record<string, unknown>>,
    default: () => ({})
  }
})

const emit = defineEmits(['update:modelValue', 'update:text'])

const state = reactive({
  checkboxes: ref<any[]>([]), // 复选框组件列表
  checkboxValue: [] as Array<string>, //选中值
  checkboxText: [] as Array<string>, //选中文本
  sourceData: [] as any[], // 数据源
  getFieldValue: computed(() => {
    return {
      readonly: true,
      rules: [],
      ...props.fieldAttr
    }
  }),
  isActive: computed(() => {
    return (val: string) => {
      return state.checkboxValue.includes(val) ? 'active' : ''
    }
  }),
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
  // 选择
  handleSelect(item: any) {
    const val = item[props.fieldNames.value || 'value']
    if (state.checkboxValue.includes(val)) {
      state.checkboxValue = state.checkboxValue.filter(o => o !== val)
    } else {
      state.checkboxValue.push(val)
    }
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

<style scoped lang="scss">
.checkboxButton {
  padding: 3px 10px;
  border: 1px solid var(--van-button-default-border-color);
  color: var(--van-button-default-color);
  background-color: var(--van-button-default-background);
  border-radius: var(--van-button-radius);
  margin-right: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  &.active {
    border-color: var(--van-button-primary-border-color);
    color: var(--van-button-primary-background);
    background-color: var(--van-button-plain-background);
    position: relative;
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      right: 0;
      width: 10px;
      height: 10px;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath fill='none' stroke='%23FFFFFF' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 8l4 4 8-8'/%3E%3C/svg%3E");
      background-size: contain;
      background-repeat: no-repeat;
      z-index: 2;
    }
    &::before {
      content: '';
      position: absolute;
      display: block;
      right: 0;
      bottom: 0;
      z-index: 1;
      width: 0;
      height: 0;
      border-left: 8px solid transparent;
      border-right: 8px solid var(--van-button-primary-background);
      border-bottom: 8px solid var(--van-button-primary-background);
      border-top: 8px solid transparent;
    }
  }
}
</style>
