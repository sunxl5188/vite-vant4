<template>
  <div class="h-full">
    <van-button type="primary" @click="visible = !visible">
      主要按钮
    </van-button>
    <XlPickerGroup v-model="visible" @confirm="handleConfirm">
      <template #tab1><van-date-picker v-model="currentDate" /></template>
      <template #tab2><van-time-picker v-model="currentTime" /></template>
    </XlPickerGroup>
  </div>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance, ComponentInternalInstance } from 'vue'

const { proxy } = getCurrentInstance() as ComponentInternalInstance
console.log(proxy)
const currentDate = ref<string[]>()
const currentTime = ref<string[]>()
const visible = ref<boolean>(false)
const handleConfirm = () => {
  visible.value = false
}
</script>

<style scoped></style>
