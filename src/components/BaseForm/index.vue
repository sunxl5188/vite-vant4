<template>
  <van-form :ref="el => (state.formRef = el)" v-bind="state.getBindValue">
    <template v-for="item in props.formItem" :key="item.prop">
      <van-field
        v-if="!item.fieldType"
        v-model="formData[item.prop]"
        :label="item.label"
        required="auto"
        :rules="rules[item.prop]"
        v-bind="item.fieldAttr || {}"
      />
      <template v-else-if="item.fieldType === 'slot'">
        <slot :name="item.slotName" :form-data="formData"></slot>
      </template>
      <field-calender
        v-else-if="item.fieldType === 'calendar'"
        v-model="formData[item.prop]"
        :label="item.label"
        :field-attr="state.fieldAttrComputed(item)"
        :attr="item.attr || {}"
      />
      <field-cascader
        v-else-if="item.fieldType === 'area'"
        v-model="formData[item.prop]"
        :label="item.label"
        :field-attr="state.fieldAttrComputed(item)"
        :attr="item.attr || {}"
      />
      <field-checkbox
        v-else-if="item.fieldType === 'checkbox'"
        v-model="formData[item.prop]"
        :label="item.label"
        :field-attr="state.fieldAttrComputed(item)"
        :attr="item.attr || {}"
        :options="item.data?.options || []"
        :dict="item.data?.dict || ''"
        :api="item.data?.api || ''"
        :params="item.data?.params || {}"
        :field-names="item.data?.fieldNames || { text: 'text', value: 'value' }"
      />
      <FieldCheckboxButton
        v-else-if="item.fieldType === 'checkboxButton'"
        v-model="formData[item.prop]"
        :label="item.label"
        :field-attr="state.fieldAttrComputed(item)"
        :options="item.data?.options || []"
        :dict="item.data?.dict || ''"
        :api="item.data?.api || ''"
        :params="item.data?.params || {}"
        :field-names="item.data?.fieldNames || { text: 'text', value: 'value' }"
      />
      <FieldRadio
        v-else-if="item.fieldType === 'radio'"
        v-model="formData[item.prop]"
        :label="item.label"
        :field-attr="state.fieldAttrComputed(item)"
        :options="item.data?.options || []"
        :dict="item.data?.dict || ''"
        :api="item.data?.api || ''"
        :params="item.data?.params || {}"
        :field-names="item.data?.fieldNames || { text: 'text', value: 'value' }"
      />
      <FieldSwitch
        v-else-if="item.fieldType === 'switch'"
        v-model="formData[item.prop]"
        :label="item.label"
        :field-attr="state.fieldAttrComputed(item)"
        :attr="item.attr || {}"
      />
      <FieldDateGroup
        v-else-if="item.fieldType === 'dateRange'"
        v-model="formData[item.prop]"
        :label="item.label"
        :field-attr="state.fieldAttrComputed(item)"
        :attr="item.attr || {}"
        :start-attr="item.attr?.startAttr || {}"
        :end-attr="item.attr?.endAttr || {}"
      />
      <FieldDateTimeGroup
        v-else-if="item.fieldType === 'dateTime'"
        v-model="formData[item.prop]"
        :label="item.label"
        :field-attr="state.fieldAttrComputed(item)"
        :attr="item.attr || {}"
      />
      <FieldDate
        v-else-if="item.fieldType === 'date'"
        v-model="formData[item.prop]"
        :label="item.label"
        :field-attr="state.fieldAttrComputed(item)"
        :attr="item.attr || {}"
      />
      <FieldTime
        v-else-if="item.fieldType === 'time'"
        v-model="formData[item.prop]"
        :label="item.label"
        :field-attr="state.fieldAttrComputed(item)"
        :attr="item.attr || {}"
      />
      <FieldTimeGroup
        v-else-if="item.fieldType === 'timeRange'"
        v-model="formData[item.prop]"
        :label="item.label"
        :field-attr="state.fieldAttrComputed(item)"
        :attr="item.attr || {}"
      />
      <FieldUpload
        v-else-if="item.fieldType === 'upload'"
        v-model="formData[item.prop]"
        :label="item.label"
        :field-attr="state.fieldAttrComputed(item)"
        :attr="item.attr || {}"
      />
      <FieldPicker
        v-else-if="item.fieldType === 'picker'"
        v-model="formData[item.prop]"
        :label="item.label"
        :field-attr="state.fieldAttrComputed(item)"
        :attr="item.attr || {}"
        :columns="item.data?.options || []"
        :dict="item.data?.dict || ''"
        :api="item.data?.api || ''"
        :params="item.data?.params || {}"
        :field-names="item.data?.fieldNames || state.fieldNames"
      />
      <FieldPickerTag
        v-else-if="item.fieldType === 'pickerTag'"
        v-model="formData[item.prop]"
        :label="item.label"
        :field-attr="state.fieldAttrComputed(item)"
        :attr="item.attr || {}"
        :columns="item.data?.options || []"
        :dict="item.data?.dict || ''"
        :api="item.data?.api || ''"
        :params="item.data?.params || {}"
        :field-names="item.data?.fieldNames || state.fieldNames"
      />
    </template>
    <div class="p-4">
      <slot name="button">
        <van-button
          :loading="state.loading"
          round
          block
          type="primary"
          @click="handleSubmit"
        >
          提交
        </van-button>
      </slot>
    </div>
  </van-form>
</template>

<script setup lang="ts" name="BaseForm">
import type { PickerFieldNames } from 'vant'
import type { FormItemType } from './index'
const FieldCalender = defineAsyncComponent(
  () => import(/* webpackPrefetch: true */ '@/components/FieldCalendar')
)
const FieldCascader = defineAsyncComponent(
  () => import(/* webpackPrefetch: true */ '@/components/FieldCascader')
)
const FieldCheckbox = defineAsyncComponent(
  () => import(/* webpackPrefetch: true */ '@/components/FieldCheckbox')
)
const FieldCheckboxButton = defineAsyncComponent(
  () => import(/* webpackPrefetch: true */ '@/components/FieldCheckboxButton')
)
const FieldRadio = defineAsyncComponent(
  () => import(/* webpackPrefetch: true */ '@/components/FieldRadio')
)
const FieldSwitch = defineAsyncComponent(
  () => import(/* webpackPrefetch: true */ '@/components/FieldSwitch')
)
const FieldDateGroup = defineAsyncComponent(
  () => import(/* webpackPrefetch: true */ '@/components/FieldDateGroup')
)
const FieldDateTimeGroup = defineAsyncComponent(
  () => import(/* webpackPrefetch: true */ '@/components/FieldDateTimeGroup')
)
const FieldDate = defineAsyncComponent(
  () => import(/* webpackPrefetch: true */ '@/components/FieldDate')
)
const FieldTime = defineAsyncComponent(
  () => import(/* webpackPrefetch: true */ '@/components/FieldTime')
)
const FieldTimeGroup = defineAsyncComponent(
  () => import(/* webpackPrefetch: true */ '@/components/FieldTimeGroup')
)
const FieldUpload = defineAsyncComponent(
  () => import(/* webpackPrefetch: true */ '@/components/FieldUpload')
)
const FieldPicker = defineAsyncComponent(
  () => import(/* webpackPrefetch: true */ '@/components/FieldPicker')
)
const FieldPickerTag = defineAsyncComponent(
  () => import(/* webpackPrefetch: true */ '@/components/FieldPickerTag')
)

interface PropsType {
  formItem?: FormItemType[]
  rules?: { [key: string]: any }
}

interface StateType {
  loading: boolean
  formRef: Ref<any>
  fieldNames: PickerFieldNames
  getBindValue: ComputedRef<Record<string, unknown>>
  formData: { [key: string]: any }
  handleSubmit: () => Promise<{ code: number; data: any }>
  fieldAttributes: (_item: any) => Record<string, unknown>
  fieldAttrComputed: ComputedRef<(_item: any) => any>
}

const slots = useSlots()
const emit = defineEmits(['submit'])

const props = withDefaults(defineProps<PropsType>(), {
  formItem: () => [],
  rules: () => ({})
})

const state = reactive<StateType>({
  loading: false,
  formRef: ref<any>(null),
  fieldNames: { text: 'text', value: 'value', children: 'children' },
  getBindValue: computed(() => {
    return {
      'error-message-align': 'right',
      'input-align': 'right',
      'scroll-to-error': true
    }
  }),
  formData: {},
  handleSubmit() {
    return new Promise(resolve => {
      state.loading = true
      state.formRef
        ?.validate()
        .then(() => {
          if (!slots.button) {
            emit('submit', state.formData)
          } else {
            resolve({ code: 200, data: state.formData })
          }
          state.loading = false
        })
        .catch((err: any) => {
          state.loading = false
          if (slots.button) {
            resolve({ code: 0, data: null })
          }
          console.log('🚀 ~ err:', err)
        })
    })
  },
  fieldAttributes: item => {
    return {
      label: item.label,
      placeholder: item.placeholder,
      border: item.border === undefined,
      rules: props.rules[item.prop] || []
    }
  },
  fieldAttrComputed: computed(() => (item: any) => {
    const obj = item.fieldAttr || {}
    const rules = { rules: props.rules[item.prop] || [] }
    return { ...obj, ...rules }
  })
})

const { formData, handleSubmit } = toRefs(state)

watch(
  () => props.formItem,
  newVal => {
    newVal.forEach((item: any) => {
      if (item.prop) {
        state.formData[item.prop] = item.value
      }
    })
  },
  { immediate: true }
)

defineExpose({
  onSubmit: state.handleSubmit
})
</script>
