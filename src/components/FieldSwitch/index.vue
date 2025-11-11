<template>
  <van-field :label="label" required="auto" v-bind="state.getFieldValue">
    <template #input>
      <van-switch
        v-model="state.checked"
        v-bind="state.getBindValue"
        @change="state.handleChange"
      />
    </template>
  </van-field>
</template>

<script setup lang="ts" name="FieldSwitch">
const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  // 绑定值
  modelValue: {
    type: String,
    default: ''
  },
  // 绑定文本值
  text: {
    type: Array as () => string[],
    default: () => []
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

const state = reactive({
  checked: ref<string>(''), // 复选框组件列表
  getFieldValue: computed(() => {
    return {
      readonly: true,
      rules: [],
      ...props.fieldAttr
    }
  }),
  getBindValue: computed((): Partial<{ [key: string]: any }> => {
    return {
      'inactive-value': '0',
      'active-value': '1',
      ...props.attr
    }
  }),
  // 处理值变化
  handleChange() {
    emit('update:modelValue', state.checked)
  }
})

watch(
  () => props.modelValue,
  val => {
    if (val) {
      state.checked = val
    }
  },
  { immediate: true }
)
</script>
