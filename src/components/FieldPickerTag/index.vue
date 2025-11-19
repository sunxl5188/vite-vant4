<template>
  <van-field
    v-model="fieldText"
    :label="label"
    required="auto"
    v-bind="state.getFieldValue"
    @click="handleShowPopup"
  />
  <van-popup v-model:show="showPicker" destroy-on-close round position="bottom">
    <div class="van-picker__toolbar">
      <button
        type="button"
        class="van-picker__cancel van-haptics-feedback"
        @click="state.showPicker = false"
      >
        取消
      </button>
      <div class="van-picker__title van-ellipsis">
        {{ attr.title || '请选择' }}
      </div>
      <button
        type="button"
        class="van-picker__confirm van-haptics-feedback"
        @click="state.onConfirm"
      >
        确认
      </button>
    </div>
    <div
      class="grid gap-2 p-4 max-h-[70vh] overflow-y-auto"
      :class="[
        { 'grid-cols-2': state.row === 2 },
        { 'grid-cols-3': state.row === 3 },
        { 'grid-cols-4': state.row === 4 },
        { 'grid-cols-5': state.row === 5 }
      ]"
    >
      <span
        v-for="(item, i) in state.sourceData"
        :key="i"
        class="checkboxButton"
        :class="state.isActive(item[fieldNames.value || 'value'])"
        @click="state.handleSelect(item)"
      >
        {{ item[fieldNames.text || 'text'] }}
      </span>
    </div>
    <van-empty v-if="!state.sourceData.length" description="暂无数据" />
  </van-popup>
</template>

<script setup lang="ts" name="FieldPickerTag">
import { fetch } from '@/utils/request'
import { useAppStore } from '@/store/useAppStore'

interface PickerFieldNames {
  text?: string
  value?: string
}

interface PropsType {
  modelValue: string[]
  text?: string
  label: string
  // 列数据
  columns?: Array<any>
  // 字典类型
  dict?: string
  // 接口地址
  api?: string
  // 接口参数
  params?: { [key: string]: any }
  // 字段映射
  fieldNames?: PickerFieldNames
  //输入框属性
  fieldAttr?: Record<string, unknown>
  //弹窗属性
  attr?: Record<string, unknown>
}

const props = withDefaults(defineProps<PropsType>(), {
  modelValue: () => [],
  text: '',
  label: '',
  columns: () => [],
  dict: '',
  api: '',
  params: () => ({}),
  fieldNames: () => ({ text: 'text', value: 'value' }),
  fieldAttr: () => ({}),
  attr: () => ({})
})

const emit = defineEmits(['update:modelValue', 'update:text'])
const appStore = useAppStore()
const state = reactive({
  showPicker: false,
  fieldText: '',
  pickerValue: [] as string[],
  sourceData: [] as any[],
  row: props.attr?.row || 4,
  getFieldValue: computed(() => {
    return {
      'is-link': true,
      readonly: true,
      placeholder: '请选择',
      rules: [],
      ...props.fieldAttr
    }
  }),
  isActive: computed(() => {
    return (val: string) => {
      return state.pickerValue.includes(val) ? 'active' : ''
    }
  }),
  //显示选择器
  handleShowPopup() {
    state.showPicker = true
  },
  // 选择选项
  handleSelect(item: any) {
    const field = props.fieldNames
    const value = item[field.value || 'value']
    const index = state.pickerValue.indexOf(value)
    if (index >= 0) {
      state.pickerValue.splice(index, 1)
    } else {
      state.pickerValue.push(value)
    }
  },
  //获取显示文本
  handleQueryText() {
    const field = props.fieldNames
    const data = state.sourceData.filter((item: any) =>
      state.pickerValue.includes(item[field.value || 'value'])
    )
    state.fieldText = data
      .map((item: any) => item[field.text || 'text'])
      .join(',')
  },
  //确认选择
  onConfirm() {
    state.handleQueryText()
    emit('update:modelValue', state.pickerValue)
    emit('update:text', state.fieldText)
    state.showPicker = false
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
    state.sourceData = appStore.dictData[props.dict]
  } else if (props.api) {
    state.handleLoad()
  } else {
    state.sourceData = props.columns || []
  }
})

watch(
  () => [props.modelValue, state.sourceData],
  () => {
    if (props.modelValue?.length) {
      state.pickerValue = JSON.parse(JSON.stringify(props.modelValue))
      state.handleQueryText()
    }
  },
  { immediate: true }
)

const { showPicker, fieldText, handleShowPopup } = toRefs(state)
</script>
<style lang="scss" scoped>
.checkboxButton {
  padding: 3px 10px;
  border: 1px solid var(--van-button-default-border-color);
  color: var(--van-button-default-color);
  background-color: var(--van-button-default-background);
  border-radius: var(--van-button-radius);
  margin-right: 10px;
  margin-bottom: 10px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
