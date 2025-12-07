<template>
  <van-field
    :label="label"
    required="auto"
    v-bind="state.getFieldValue"
    :class="[{ noBorder: type !== 'line' }]"
  >
    <template #input>
      <van-checkbox-group
        v-model="state.checkboxValue"
        v-bind="state.getBindValue"
        @change="state.handleChange"
      >
        <van-checkbox
          v-for="(item, index) in state.sourceData"
          :key="item[fieldNames.value || 'value'] + index"
          :name="item[fieldNames.value || 'value']"
        >
          {{ item[fieldNames.text || 'text'] }}
        </van-checkbox>
      </van-checkbox-group>
    </template>
  </van-field>
</template>

<script setup lang="ts" name="FieldCheckbox">
import { fetch } from '@/utils/request'
import { useUserStore } from '@/store/useUserStore'

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
  },
  // 组件属性
  attr: {
    type: Object as PropType<Record<string, unknown>>,
    default: () => ({})
  }
})

const emit = defineEmits(['update:modelValue', 'update:text'])
const userStore = useUserStore()
const type = inject('type', 'line')
const state = reactive({
  checkboxes: ref<any[]>([]), // 复选框组件列表
  checkboxValue: [] as Array<string>, //选中值
  checkboxText: [] as Array<string>, //选中文本
  sourceData: [] as any[], // 数据源
  getFieldValue: computed(() => {
    return {
      readonly: true,
      border: true,
      rules: [],
      ...props.fieldAttr
    }
  }),
  getBindValue: computed((): Partial<{ [key: string]: any }> => {
    return {
      direction: 'horizontal',
      shape: 'round',
      ...props.attr
    }
  }),
  // 加载数据
  async handleLoad() {
    const { code, data } = await fetch(props.api, props.params)
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
  if (props.dict) {
    state.sourceData = userStore.dictData[props.dict]
  } else if (props.api) {
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
