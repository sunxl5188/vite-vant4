<template>
  <XlPickerGroup
    ref="picker"
    v-model="visible"
    :attribute="attribute"
    @confirm="handleConfirm"
    @cancel="handleCancel"
  >
    <template #tab1>
      <van-date-picker
        v-model="currentDate1"
        v-bind="_dateAttr"
        @change="handleChange"
      />
    </template>
    <template #tab2>
      <van-time-picker
        v-model="currentTime1"
        v-bind="_timeAttr"
        @change="handleChange"
      />
    </template>
    <!-- ================== -->
    <template #tab3>
      <van-date-picker
        v-model="currentDate2"
        v-bind="_dateAttr2"
        @change="handleChange"
      />
    </template>
    <template #tab4>
      <van-time-picker
        v-model="currentTime2"
        v-bind="_timeAttr2"
        @change="handleChange"
      />
    </template>
  </XlPickerGroup>
</template>

<script setup lang="ts" name="XlPickerDateTimeGroup">
import XlPickerGroup from '../picker-group/index'
import useCurrentInstance from '@/utils/useCurrentInstance'

const picker = ref<InstanceType<typeof XlPickerGroup> | null>(null)

interface PropsType {
  tabs?: string[]
  dateAttr?: object
  timeAttr?: object
}
const props = withDefaults(defineProps<PropsType>(), {
  tabs: () => {
    return []
  },
  dateAttr: () => {
    return {}
  },
  timeAttr: () => {
    return {}
  }
})

const attribute = ref({
  ...{
    tabs: ['开始日期', '开始时间', '结束日期', '结束时间']
  },
  ...props.tabs
})

const _dateAttr = ref({
  ...{
    'show-toolbar': false,
    'columns-type': ['year', 'month', 'day']
  },
  ...props.dateAttr
})

const _dateAttr2 = ref({
  ...{},
  ..._dateAttr.value,
  ...{
    'min-date': new Date()
  }
})

const _timeAttr = ref({
  'show-toolbar': false,
  'columns-type': ['hour', 'minute', 'second']
})
const _timeAttr2 = ref({
  ..._timeAttr.value,
  ...{
    'min-time': ''
  }
})

const visible = defineModel('visible', { type: Boolean, default: false })
const value = defineModel('value', {
  type: Array,
  default: () => {
    return []
  }
})
const emit = defineEmits(['update:model-value', 'update:value', 'confirm'])

const currentDate1 = ref<string[]>(new Array(3))
const currentTime1 = ref<string[]>(new Array(3))
const currentDate2 = ref<string[]>(new Array(3))
const currentTime2 = ref<string[]>(new Array(3))

const { proxy } = useCurrentInstance()

//格式化日期
const formatDate = (): string[] => {
  const date1 = [...currentDate1.value, ...currentTime1.value]
  const date2 = [...currentDate2.value, ...currentTime2.value]
  const month1 = (Number(date1[1]) - 1).toString()
  const month2 = (Number(date2[1]) - 1).toString()
  date1.splice(1, 1, month1)
  date2.splice(1, 1, month2)
  const checkDate = [
    proxy.$dayjs(date1).format('YYYY-MM-DD HH:mm:ss'),
    proxy.$dayjs(date2).format('YYYY-MM-DD HH:mm:ss')
  ]
  return checkDate
}

//提交日期
const handleConfirm = (): void => {
  const checkDate = formatDate()
  emit('confirm', checkDate)
  picker.value!.activeTab = 0
  handleCancel()
}

const handleCancel = (): void => {
  emit('update:model-value', false)
}

const handleChange = (): void => {
  const checkDate = formatDate()
  emit('update:value', checkDate)
  _dateAttr2.value['min-date'] = proxy.$dayjs(checkDate[0]).toDate()
  _timeAttr2.value['min-time'] = proxy.$dayjs(value.value[0]).format('HH:mm:ss')
}

onMounted(() => {
  if (value.value) {
    currentDate1.value = proxy
      .$dayjs(value.value[0])
      .format('YYYY-MM-DD')
      .split('-')
    currentTime1.value = proxy
      .$dayjs(value.value[0])
      .format('HH:mm:ss')
      .split(':')
    currentDate2.value = proxy
      .$dayjs(value.value[1])
      .format('YYYY-MM-DD')
      .split('-')
    currentTime2.value = proxy
      .$dayjs(value.value[1])
      .format('HH:mm:ss')
      .split(':')
    _dateAttr2.value['min-date'] = proxy.$dayjs(value.value[0]).toDate()
    _timeAttr2.value['min-time'] = proxy
      .$dayjs(value.value[0])
      .format('HH:mm:ss')
  } else {
    currentDate1.value = proxy.$dayjs().format('YYYY-MM-DD').split('-')
    currentDate2.value = proxy.$dayjs().format('YYYY-MM-DD').split('-')
    currentTime1.value = proxy.$dayjs().format('HH:mm:ss').split(':')
    currentTime2.value = proxy.$dayjs().format('HH:mm:ss').split(':')
    _dateAttr2.value['min-date'] = proxy.$dayjs().toDate()
    _timeAttr2.value['min-time'] = proxy.$dayjs().format('HH:mm:ss')
  }
})
</script>

<style scoped></style>
