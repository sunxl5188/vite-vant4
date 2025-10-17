<template>
  {{ cascaderValue }}
  <van-field
    v-model="fieldText"
    is-link
    readonly
    label="地区"
    :placeholder="placeholder"
    @click="handleShowPopup"
  />
  <van-popup v-model:show="visible" round position="bottom">
    <van-cascader
      v-model="cascaderValue"
      :title="placeholder"
      :options="sourceData"
      @close="handleClose"
      @finish="handleFinish"
    />
  </van-popup>
</template>

<script setup lang="ts" name="CascaderIndex">
import type { CascaderFieldNames, CascaderOption } from 'vant'

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
}

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: '请选择所在地区'
  },
  options: {
    type: Array as PropType<CascaderOption[]>,
    default: () => []
  },
  fieldNames: {
    type: Object as PropType<CascaderFieldNames>,
    default: () => ({
      text: 'text',
      value: 'value',
      children: 'children'
    })
  }
})

const emit = defineEmits(['update:modelValue', 'update:text'])

const state = reactive<StateType>({
  visible: false,
  fieldText: '',
  fieldValue: '',
  cascaderValue: '',
  sourceData: [
    {
      text: '浙江省',
      value: '330000',
      children: [{ text: '杭州市', value: '330100' }]
    },
    {
      text: '江苏省',
      value: '320000',
      children: [{ text: '南京市', value: '320100' }]
    }
  ],
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
