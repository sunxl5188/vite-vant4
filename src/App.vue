<template>
  <div class="h-full">
    <div>{{ value }}</div>
    <van-button type="primary" @click="visible = !visible">
      主要按钮
    </van-button>
    <XlPickerDateTimeGroup
      v-model="visible"
      v-model:value="value"
      @confirm="handleConfirm"
    >
    </XlPickerDateTimeGroup>
  </div>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance, ComponentInternalInstance } from 'vue'

const { proxy } = getCurrentInstance() as ComponentInternalInstance
console.log(proxy)
//const currentDate = ref<string[]>()
//const currentTime = ref<string[]>()
const visible = ref<boolean>(false)
const value = ref<string[]>(['2020-12-10 08:10:22', '2024-12-20 12:09:30'])
const handleConfirm = (date: string[]) => {
  value.value = date
}
</script>

<style scoped></style>
