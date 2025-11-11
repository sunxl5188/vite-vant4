<template>
  <van-radio-group v-model="checkValue">
    <template v-if="isCell">
      <van-cell
        v-for="(item, i) in data"
        :key="i"
        :title="item[field.label]"
        @click="handleToggle(i)"
      >
        <template #right-icon>
          <van-radio
            :ref="el => (radioRefs[i] = el)"
            :name="item[field.value]"
            @click.stop
          />
        </template>
      </van-cell>
    </template>
    <template v-else>
      <van-radio v-for="(item, i) in data" :key="i" :name="item[field.value]">
        {{ item[field.label] }}
      </van-radio>
    </template>
  </van-radio-group>
</template>

<script setup lang="ts" name="XlRadio">
interface PropsType {
  isCell: boolean
  field?: { label: string; value: string | number }
  data?: Array<any>
}
withDefaults(defineProps<PropsType>(), {
  isCell: false,
  field: () => {
    return {
      label: 'label',
      value: 'value'
    }
  },
  data: () => {
    return [
      {
        label: '单选框1',
        value: '1'
      },
      {
        label: '单选框2',
        value: '2'
      }
    ]
  }
})
const checkValue = defineModel<string | number>({ type: String, default: '' })
defineEmits(['update:model-value'])
const radioRefs = ref<any[]>([])

const handleToggle = (i: number): void => {
  checkValue.value = radioRefs.value[i].name
}
</script>
