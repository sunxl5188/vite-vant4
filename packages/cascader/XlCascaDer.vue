<template>
  <XlPopup v-model="visible" v-bind="popupAttribute">
    <van-cascader
      v-model="checkValue"
      :fieldNames="fieldNames"
      :options="data"
      v-bind="_attribute"
      @close="handleClose"
      @finish="handleFinish"
    ></van-cascader>
  </XlPopup>
</template>

<script setup lang="ts" name="XlCascader">
import { ref } from 'vue'
import XlPopup from '../popup'
import type { CascaderOption, CascaderFieldNames } from 'vant'
import city from '../utils/city'

interface PropsType {
  attribute?: object
  fieldNames?: CascaderFieldNames
  data?: CascaderOption[]
}

const props = withDefaults(defineProps<PropsType>(), {
  attribute: () => {
    return {}
  },
  fieldNames: () => {
    return { text: 'label', value: 'value', children: 'children' }
  },
  data: () => {
    return city
  }
})

const checkValue = ref<string | number>('')

defineModel('value')
const visible = defineModel({ type: Boolean, default: false })
const emit = defineEmits(['update:model-value', 'update:value', 'confirm'])

const _attribute = ref<object>({
  ...{
    title: '请选择地区'
  },
  ...props.attribute
})

const popupAttribute = ref<object>({
  closeable: false,
  style: { height: '31.5rem' }
})

const handleClose = (): void => {
  emit('update:model-value', false)
}
const handleFinish = (e: any): void => {
  const { selectedOptions } = e
  emit('update:value', checkValue.value)
  emit('confirm', { value: checkValue.value, selectedOptions })
  handleClose()
}
</script>

<style scoped></style>
../../src/utils/city ../utils/city
