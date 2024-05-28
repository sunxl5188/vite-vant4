<template>
  <div class="h-full bg-gray-200">
    <XlPullRefresh>1111</XlPullRefresh>
    <!-- <VirtuallyList /> -->
    <!-- <XlUploader />
    <div>{{ value }}</div>
    <van-button type="primary" @click="visible = !visible">
      主要按钮
    </van-button>
    <XlCheckbox v-model="value" isCell> </XlCheckbox>
    <hr />
    <div>{{ value1 }}</div>
    <XlRadio v-model="value1" isCell> </XlRadio> -->
  </div>
</template>

<script setup lang="ts">
import XlPullRefresh from '../packages/pull-refresh/XlPullRefresh.vue'
//import VirtuallyList from '../packages/virtually-list/XlVirtuallyList.vue'
//import { getCurrentInstance, ComponentInternalInstance } from 'vue'

//const { proxy } = getCurrentInstance() as ComponentInternalInstance
//console.log(proxy)
//const currentDate = ref<string[]>()
//const currentTime = ref<string[]>()
/* const visible = ref<boolean>(false)
const value = ref<string[]>(['1', '2'])
const value1 = ref<string>('2') */
/* const handleConfirm = (date: string[]) => {
  value.value = date
} */
</script>

<style scoped></style>
