<template>
  <van-button type="primary">主要按钮</van-button>
  <van-cell title="选择单个日期" :value="date" @click="show = true" />
  <van-calendar v-model:show="show" @confirm="onConfirm" />
  <!-- Trigger -->
  <!-- <button
    class="btn"
    data-clipboard-text="Just because you can doesn't mean you should — clipboard.js"
    @click="copyContent('.btn')"
  >
    Copy to clipboard
  </button> -->
  <Cascader v-model="value" />
</template>

<script setup lang="ts" name="HomeIndex">
// import { useUserStore } from '@/store/userStore'
// import dayjs from '@/utils/dayjs'
// import { copyContent } from '@/utils'
import Cascader from '@/components/cascader/index.vue'
const value = ref<string>('320000,320100')

const date = ref('')
const show = ref(false)

const formatDate = (date: Date) => {
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
}
const onConfirm = (value: any) => {
  show.value = false
  date.value = formatDate(value)
}
// const store = useUserStore()
// console.log(store.name)
// store.setName('李四')
// console.log(store.getName)

// console.log(dayjs().format('YYYY-MM-DD'))
</script>

<style scoped lang="less"></style>
