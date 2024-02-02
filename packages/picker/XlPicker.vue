<template>
  <XlPopup v-model="visibleBoole" :attribute="popupAttribute">
    <van-picker
      :columns="columns"
      v-bind="_attribute"
      @cancel="handleCancel"
      @confirm="handleConfirm"
      @change="handleChange"
    ></van-picker>
  </XlPopup>
</template>

<script setup lang="ts" name="XlPicker">
import { ref, watch } from 'vue'
import type {
  PickerColumn,
  PickerFieldNames,
  PickerChangeEventParams,
  PickerConfirmEventParams
} from 'vant'
import city from '../utils/city'

interface PropsType {
  columns?: PickerColumn
  fieldNames?: PickerFieldNames
}
const props = withDefaults(defineProps<PropsType>(), {
  fieldNames: () => {
    return { text: 'label', value: 'value', children: 'children' }
  },
  columns: () => {
    return city
  }
})
const visibleBoole = ref<boolean>(false)
const visible = defineModel({ type: Boolean, default: false })
const checkValue = defineModel('value', { type: Array, default: () => [] })
const emit = defineEmits(['update:model-value', 'update:value', 'confirm'])

const popupAttribute = ref<object>({
  closeable: false
})

const _attribute = ref({
  ...{
    title: '请选择地区',
    'swipe-duration': 300
  },
  ...{ columnsFieldNames: props.fieldNames }
})

const handleCancel = (): void => {
  emit('update:model-value', false)
}

const handleConfirm = ({
  selectedValues,
  selectedOptions,
  selectedIndexes
}: PickerConfirmEventParams): void => {
  emit('confirm', selectedValues, selectedOptions, selectedIndexes)
  handleCancel()
}

const handleChange = ({ selectedValues }: PickerChangeEventParams): void => {
  emit('update:value', selectedValues)
}

// wathc=======================
watch(
  () => visible.value,
  val => {
    visibleBoole.value = val
  },
  { immediate: true }
)
</script>

<style scoped></style>
