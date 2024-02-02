<template>
  <div>
    {{ value }}==={{ visible }}
    <van-button type="primary" @click="visible = !visible">
      主要按钮
    </van-button>
    <XlPicker v-model="visible" @confirm="handleConfirm" />
  </div>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance, ComponentInternalInstance } from 'vue'

const { proxy } = getCurrentInstance() as ComponentInternalInstance
console.log(proxy)

const visible = ref<boolean>(false)
const value = ref()

const handleConfirm = (data: string): void => {
  console.log(data)
}
</script>

<style scoped></style>
