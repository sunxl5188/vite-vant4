<template>
  <van-space wrap>
    <van-button type="primary" url="/">首页</van-button>
    <van-button type="primary" url="/form">表单示例</van-button>
  </van-space>
  <div class="p-4">
    <div style="height: 30px" class="h-[30px]">
      {{ getDictFilter('area', '0592') }}
    </div>
    <div>{{ state }}</div>
    <div>
      <van-button type="primary" @click="handleUpdate">点击更新</van-button>
    </div>
  </div>
  <FieldCode />
</template>

<script setup lang="ts" name="HomeIndex">
import { useAppStore } from '@/store/useAppStore'
import { getDictFilter } from '@/utils'
import FieldCode from '@/components/FieldCode'

const appStore = useAppStore()

console.log(appStore.theme)
const state = shallowRef({
  name: 'home index',
  age: 100,
  dictName: ''
})

const handleUpdate = () => {
  state.value.age += 1
  triggerRef(state)
}

onMounted(async () => {
  //----
})
</script>

<style lang="scss" scoped></style>
