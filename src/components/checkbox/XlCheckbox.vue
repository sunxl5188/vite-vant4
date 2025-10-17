<template>
  <div>
    <div v-if="isAll && !isCell">
      <van-checkbox
        v-model="isCheckAll"
        :indeterminate="isIndeterminate"
        @change="handleAllChange"
      >
        全选
      </van-checkbox>
    </div>
    <template v-if="isAll && isCell">
      <van-cell title="全选" @click="handleCellAllClick">
        <template #right-icon>
          <van-checkbox
            ref="allRef"
            v-model="isCheckAll"
            :indeterminate="isIndeterminate"
            @change="handleAllChange"
            @click.stop
          ></van-checkbox>
        </template>
      </van-cell>
    </template>
    <van-checkbox-group v-model="checkValue" @change="handleChange">
      <template v-if="isCell">
        <van-cell
          v-for="(item, i) in data"
          :key="i"
          :title="item[field.label]"
          @click="handleToggle(i)"
        >
          <template #right-icon>
            <van-checkbox
              :ref="el => (checkboxRefs[i] = el)"
              :name="item[field.value]"
              @click.stop
            />
          </template>
        </van-cell>
      </template>
      <!-- ============================= -->
      <template v-else>
        <van-checkbox
          v-for="(item, i) of data"
          :name="item[field.value]"
          :key="i"
        >
          {{ item[field.label] }}
        </van-checkbox>
      </template>
    </van-checkbox-group>
  </div>
</template>

<script setup lang="ts" name="XlCheckbox">
import type { CheckboxInstance } from 'vant'
interface PropsType {
  isAll?: boolean
  isCell?: boolean
  field?: { label: string; value: string | number }
  data?: Array<any>
}

const props = withDefaults(defineProps<PropsType>(), {
  isAll: false,
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
        label: '复选框1',
        value: '1'
      },
      {
        label: '复选框2',
        value: '2'
      },
      {
        label: '复选框3',
        value: '3'
      },
      {
        label: '复选框4',
        value: '4'
      }
    ]
  }
})

const isCheckAll = ref<boolean>(false)
const isIndeterminate = ref<boolean>(false)
const checkboxRefs = ref<any[]>([])
const allRef = ref<CheckboxInstance>()
const checkValue = defineModel<(string | number)[]>({
  type: Array,
  default: () => {
    return []
  }
})
const emit = defineEmits(['update:model-value'])

const handleChange = (data: (string | number)[]): void => {
  if (checkValue.value.length === props.data.length) {
    isCheckAll.value = true
    isIndeterminate.value = false
  } else if (checkValue.value.length === 0) {
    isCheckAll.value = false
    isIndeterminate.value = false
  } else {
    isCheckAll.value = false
    isIndeterminate.value = true
  }
  emit('update:model-value', data)
}

const handleAllChange = (val: boolean): void => {
  if (val) {
    checkValue.value = props.data.map(item => item[props.field.value]) as []
  } else {
    checkValue.value = []
  }
  isIndeterminate.value = false
}

const handleToggle = (i: number): void => {
  checkboxRefs.value[i].toggle()
}

const handleCellAllClick = () => {
  allRef.value?.toggle()
}

onMounted(() => {
  if (checkValue.value.length) {
    handleChange(checkValue.value)
  }
})
</script>

<style scoped land="scss"></style>
