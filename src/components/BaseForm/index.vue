<template>
  <van-cell-group :inset="type === 'input-inline'" :border="false">
    <van-form
      :ref="el => (state.formRef = el)"
      v-bind="state.getBindValue"
      :class="type"
    >
      <template v-for="item in props.formItem" :key="item.prop">
        <van-field
          v-if="!item.fieldType"
          v-model="formData[item.prop]"
          :label="state.labelName(item)"
          required="auto"
          :rules="rules[item.prop]"
          v-bind="state.fieldAttrComputed(item)"
        />
        <template v-else-if="item.fieldType === 'slot'">
          <slot :name="item.slotName" :form-data="formData"></slot>
        </template>
        <field-calender
          v-else-if="item.fieldType === 'calendar'"
          v-model="formData[item.prop]"
          :label="state.labelName(item)"
          :field-attr="state.fieldAttrComputed(item)"
          :attr="item.attr || {}"
        />
        <field-cascader
          v-else-if="item.fieldType === 'area'"
          v-model="formData[item.prop]"
          :label="state.labelName(item)"
          :field-attr="state.fieldAttrComputed(item)"
          :attr="item.attr || {}"
        />
        <field-checkbox
          v-else-if="item.fieldType === 'checkbox'"
          v-model="formData[item.prop]"
          :label="state.labelName(item)"
          :field-attr="state.fieldAttrComputed(item)"
          :attr="item.attr || {}"
          :options="item.data?.options || []"
          :dict="item.data?.dict || ''"
          :api="item.data?.api || ''"
          :params="item.data?.params || {}"
          :field-names="
            item.data?.fieldNames || { text: 'text', value: 'value' }
          "
        />
        <FieldCheckboxButton
          v-else-if="item.fieldType === 'checkboxButton'"
          v-model="formData[item.prop]"
          :label="state.labelName(item)"
          :field-attr="state.fieldAttrComputed(item)"
          :options="item.data?.options || []"
          :dict="item.data?.dict || ''"
          :api="item.data?.api || ''"
          :params="item.data?.params || {}"
          :field-names="
            item.data?.fieldNames || { text: 'text', value: 'value' }
          "
        />
        <FieldRadio
          v-else-if="item.fieldType === 'radio'"
          v-model="formData[item.prop]"
          :label="state.labelName(item)"
          :field-attr="state.fieldAttrComputed(item)"
          :options="item.data?.options || []"
          :dict="item.data?.dict || ''"
          :api="item.data?.api || ''"
          :params="item.data?.params || {}"
          :field-names="
            item.data?.fieldNames || { text: 'text', value: 'value' }
          "
        />
        <FieldSwitch
          v-else-if="item.fieldType === 'switch'"
          v-model="formData[item.prop]"
          :label="state.labelName(item)"
          :field-attr="state.fieldAttrComputed(item)"
          :attr="item.attr || {}"
        />
        <FieldDateGroup
          v-else-if="item.fieldType === 'dateRange'"
          v-model="formData[item.prop]"
          :label="state.labelName(item)"
          :field-attr="state.fieldAttrComputed(item)"
          :attr="item.attr || {}"
          :start-attr="item.attr?.startAttr || {}"
          :end-attr="item.attr?.endAttr || {}"
        />
        <FieldDateTimeGroup
          v-else-if="item.fieldType === 'dateTime'"
          v-model="formData[item.prop]"
          :label="state.labelName(item)"
          :field-attr="state.fieldAttrComputed(item)"
          :attr="item.attr || {}"
        />
        <FieldDate
          v-else-if="item.fieldType === 'date'"
          v-model="formData[item.prop]"
          :label="state.labelName(item)"
          :field-attr="state.fieldAttrComputed(item)"
          :attr="item.attr || {}"
        />
        <FieldTime
          v-else-if="item.fieldType === 'time'"
          v-model="formData[item.prop]"
          :label="state.labelName(item)"
          :field-attr="state.fieldAttrComputed(item)"
          :attr="item.attr || {}"
        />
        <FieldTimeGroup
          v-else-if="item.fieldType === 'timeRange'"
          v-model="formData[item.prop]"
          :label="state.labelName(item)"
          :field-attr="state.fieldAttrComputed(item)"
          :attr="item.attr || {}"
        />
        <FieldUpload
          v-else-if="item.fieldType === 'upload'"
          v-model="formData[item.prop]"
          :label="state.labelName(item)"
          :field-attr="state.fieldAttrComputed(item)"
          :attr="item.attr || {}"
        />
        <FieldPicker
          v-else-if="item.fieldType === 'picker'"
          v-model="formData[item.prop]"
          :label="state.labelName(item)"
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
          :label="state.labelName(item)"
          :field-attr="state.fieldAttrComputed(item)"
          :attr="item.attr || {}"
          :columns="item.data?.options || []"
          :dict="item.data?.dict || ''"
          :api="item.data?.api || ''"
          :params="item.data?.params || {}"
          :field-names="item.data?.fieldNames || state.fieldNames"
        />
        <FieldCode
          v-else-if="item.fieldType === 'code'"
          v-model="formData[item.prop]"
          :label="state.labelName(item)"
          :field-attr="state.fieldAttrComputed(item)"
          :attr="item.attr || {}"
        />
      </template>
    </van-form>
  </van-cell-group>
</template>

<script setup lang="ts" name="BaseForm">
import type { PickerFieldNames } from 'vant'
import type { FormItemType } from './common'
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
const FieldCode = defineAsyncComponent(
  () => import(/* webpackPrefetch: true */ '@/components/FieldCode')
)

interface PropsType {
  formItem?: FormItemType[]
  rules?: { [key: string]: any }
  type?: 'line' | 'input-inline' | 'input-round'
}

interface StateType {
  formRef: Ref<any>
  labelName: ComputedRef<(_item: any) => string>
  fieldNames: PickerFieldNames
  getBindValue: ComputedRef<Record<string, unknown>>
  formData: { [key: string]: any }
  handleSubmit: () => Promise<{ code: number; data: any }>
  fieldAttrComputed: ComputedRef<(_item: any) => any>
}

const props = withDefaults(defineProps<PropsType>(), {
  formItem: () => [],
  rules: () => ({}),
  type: 'line'
})

provide('type', props.type)

const state = reactive<StateType>({
  formRef: ref<any>(null),
  fieldNames: { text: 'text', value: 'value', children: 'children' },
  labelName: computed(() => {
    return function (item: any) {
      return props.type === 'input-round' ? '' : item.label
    }
  }),
  getBindValue: computed(() => {
    let baseBind: Record<string, unknown> = {}
    if (props.type === 'line') {
      baseBind = {
        'error-message-align': 'right',
        'input-align': 'right',
        'scroll-to-error': true
      }
    } else if (props.type === 'input-inline') {
      baseBind = {
        'error-message-align': 'left',
        'input-align': 'left',
        'scroll-to-error': true
      }
    } else if (props.type === 'input-round') {
      baseBind = {
        'error-message-align': 'left',
        'input-align': 'left',
        'scroll-to-error': true,
        border: false
      }
    }
    return baseBind
  }),
  formData: {},
  handleSubmit(): Promise<{ code: number; data: any }> {
    return new Promise(resolve => {
      state.formRef
        ?.validate()
        .then(() => {
          resolve({ code: 200, data: state.formData })
        })
        .catch((err: any) => {
          resolve({ code: 0, data: null })
          console.log('🚀 ~ err:', err)
        })
    })
  },
  fieldAttrComputed: computed(() => (item: any) => {
    let fieldAttr = {}
    if (props.type === 'line') {
      fieldAttr = { autocomplete: 'off', inputAlign: 'right', border: true }
    } else if (props.type === 'input-inline') {
      fieldAttr = {
        autocomplete: 'off',
        inputAlign: 'left'
      }
    } else if (props.type === 'input-round') {
      fieldAttr = {
        autocomplete: 'off',
        inputAlign: 'left',
        border: false
      }
    }
    const obj = { ...item?.fieldAttr, ...fieldAttr }
    const rules = { rules: props.rules[item.prop] || [] }
    return { ...obj, ...rules }
  })
})

const { formData } = toRefs(state)

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
<style scoped lang="scss">
.van-form {
  &.input-inline {
    :deep(.van-cell) {
      &.van-field {
        border: 1px solid var(--van-border-color);
        margin-bottom: 12px;
        border-radius: 8px;
      }
    }
  }
  &.input-round {
    :deep(.van-cell) {
      padding-top: 0;
      padding-bottom: 0;
      .van-cell__value {
        margin-bottom: 10px;
      }
      .van-field__error-message {
        text-indent: 24px;
        line-height: 18px;
        font-size: 12px;
      }
      .van-field__body {
        border: 1px solid var(--van-border-color);
        border-radius: 9999px;
        padding: var(--van-cell-vertical-padding) var(--van-padding-lg);
      }

      &.noBorder {
        .van-field__body {
          border: none;
          border-radius: 0;
          padding: 0;
        }
      }
    }
  }
}
</style>
