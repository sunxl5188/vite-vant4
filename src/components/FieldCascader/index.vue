<template>
  <van-field
    v-model="fieldText"
    :label="label"
    required="auto"
    v-bind="state.getFieldValue"
    @click="handleShowPopup"
  />
  <van-popup v-model:show="visible" round position="bottom">
    <van-cascader
      v-model="cascaderValue"
      :options="sourceData"
      v-bind="state.getBindValue"
      @close="handleClose"
      @finish="handleFinish"
    />
  </van-popup>
</template>

<script setup lang="ts" name="CascaderIndex">
import type { CascaderFieldNames, CascaderOption } from 'vant'
import cityJSON from './city.json'
import { fetch } from '@/utils/request'

interface HandleFinishParams {
  value: string | number
  selectedOptions: CascaderOption[]
  tabIndex: number
}

interface StateType {
  visible: boolean //弹出层显示隐藏
  fieldText: string //输入框显示名称
  fieldValue: string | number //输入框显示值
  cascaderValue: string | number //级联选择器值
  sourceData: CascaderOption[] //数据源
  handleShowPopup: () => void //显示弹出层
  handleClose: () => void //关闭弹出层
  handleFinish: (_: HandleFinishParams) => void //完成选择
  handleGetText: (_: string) => void //获取text
  getFieldValue: Record<string, any> //输入框属性
  getBindValue: Record<string, any> //弹窗属性
}

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  options: {
    type: Array as PropType<CascaderOption[]>,
    default: () => []
  },
  api: {
    type: String,
    default: ''
  },
  fieldNames: {
    type: Object as PropType<CascaderFieldNames>,
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

const emit = defineEmits(['update:modelValue', 'update:text'])

const state = reactive<StateType>({
  visible: false,
  fieldText: '',
  fieldValue: '',
  cascaderValue: '',
  getFieldValue: computed(() => {
    return {
      'is-link': true,
      readonly: true,
      placeholder: '请选择地区',
      rules: [],
      ...props.fieldAttr
    }
  }),
  getBindValue: computed(() => {
    return {
      title: '请选择',
      ...props.attr
    }
  }),
  sourceData: cityJSON.city as CascaderOption[],
  //显示弹出层
  handleShowPopup() {
    state.visible = true
  },
  //关闭弹出层
  handleClose() {
    state.visible = false
  },
  //获取text
  handleGetText(valArr: string) {
    const { text, value } = props.fieldNames
    const textList: string[] = []
    const loopText = (list: CascaderOption[], valArr: string[]) => {
      list.some(item => {
        if (valArr.includes(item[value || 'value'])) {
          textList.push(item[text || 'text'])
          if (item.children && item.children.length > 0) {
            loopText(item.children, valArr)
          }
          return true
        }
      })
    }
    loopText(state.sourceData, valArr.split(','))
    state.fieldText = textList.join('/')
  },
  //完成选择
  handleFinish({ selectedOptions }) {
    const { text, value } = props.fieldNames
    state.fieldText = selectedOptions
      .map(option => option[text || 'text'])
      .join('/')
    state.fieldValue = selectedOptions
      .map(option => option[value || 'value'])
      .join(',')
    emit('update:modelValue', state.fieldValue)
    emit('update:text', state.fieldText)
    state.visible = false
  }
})

onBeforeMount(async () => {
  if (props.api) {
    //这里可以根据传入的api请求数据
    const { code, data } = await fetch(props.api)
    if (code === 200) {
      state.sourceData = data
    }
  } else if (props.options?.length) {
    state.sourceData = props.options
  }
})

const {
  visible,
  fieldText,
  cascaderValue,
  sourceData,
  handleShowPopup,
  handleClose,
  handleFinish
} = toRefs(state)

watch(
  () => props.modelValue,
  val => {
    if (val) {
      const arr = val.split(',')
      state.fieldValue = val
      state.cascaderValue = arr[arr.length - 1] as string
      state.handleGetText(val)
    }
  },
  { immediate: true }
)
</script>
