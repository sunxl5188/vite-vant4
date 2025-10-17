<template>
  <van-form @submit="handleSubmit" @failed="handleFailed">
    <van-cell-group inset>
      <template v-for="item in props.formItem" :key="item.prop">
        <field-calender v-model="formData.date" />
        <field-cascader v-model="formData.area" />
      </template>
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </van-cell-group>
  </van-form>
</template>

<script setup lang="ts" name="BaseForm">
interface FormItemType {
  label: string
  prop: string
  value: string
  placeholder?: string
  type?: string
}

interface StateType {
  formData: { [key: string]: string }
  handleSubmit: () => void
  handleFailed: (_: { values: object; errors: object[] }) => void
}

const props = defineProps({
  formItem: { type: Array as PropType<FormItemType[]>, default: () => [] },
  rules: {
    type: Object as PropType<{ [key: string]: any }>,
    default: () => ({})
  }
})

const state = reactive<StateType>({
  formData: {},
  handleSubmit() {},
  handleFailed({ values, errors }) {
    console.log(values, errors)
  }
})

const { formData, handleSubmit, handleFailed } = toRefs(state)

watch(
  () => props.formItem,
  newVal => {
    newVal.forEach((item: any) => {
      state.formData[item.prop] = item.value || ''
    })
  },
  { immediate: true }
)
</script>
