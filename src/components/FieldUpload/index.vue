<template>
  <van-field :label="label" required="auto" v-bind="state.getFieldValue">
    <template #input></template>
  </van-field>
  <div class="pt-2 px-4">
    <Uploader
      v-model="state.fileList"
      :accept="attr.accept || '.jpg,.jpeg,.png,.gif'"
      :file-size="attr.fileSize || 1"
    />
  </div>
</template>

<script setup lang="ts" name="FieldUpload">
import Uploader from '../Uploader'

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => {
      return []
    }
  },
  label: { type: String, default: '' },
  //输入框属性
  fieldAttr: {
    type: Object as PropType<Record<string, unknown>>,
    default: () => ({})
  },
  //弹窗属性
  attr: {
    type: Object as any,
    default: () => ({})
  }
})

interface StateType {
  fileList: ComputedRef<any>
  getFieldValue: ComputedRef<Record<string, unknown>>
}

const emit = defineEmits(['update:modelValue'])

const state = reactive<StateType>({
  fileList: computed({
    get() {
      return props.modelValue
    },
    set(value: Array<any>) {
      emit('update:modelValue', value)
    }
  }),
  getFieldValue: computed(() => {
    return {
      readonly: true,
      rules: [],
      ...props.fieldAttr
    }
  })
})
</script>
