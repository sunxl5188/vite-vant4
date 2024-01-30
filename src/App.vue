<template>
  <div>
    <h3>{{ currentDate }}---{{ $dayjs }}</h3>
    <XlDatePicker v-model="currentDate" />
    <XlPopup v-model="visible" />
    <van-button @click="visible = !visible"> 主要按钮 </van-button>
  </div>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance, ComponentInternalInstance } from 'vue'

const currentDate = ref<string>()
const visible = ref<boolean>(false)
const { proxy } = getCurrentInstance() as ComponentInternalInstance
console.log(proxy?.$dayjs().format('YYYY-MM-DD'))
</script>

<style scoped></style>
