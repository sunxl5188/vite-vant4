<template>
  <div class="p-4 bg-gray-300 min-h-screen">
    <div style="height: 30px" class="h-[30px]">
      {{ getDictFilter('area', '0592') }}
    </div>
    <div>{{ state }}</div>
    <div>
      <van-button type="primary" @click="handleUpdate">点击更新</van-button>
    </div>
  </div>
</template>

<script setup lang="ts" name="HomeIndex">
import { useAppStore } from '@/store/useAppStore'
import { getDictFilter } from '@/utils'

const appStore = useAppStore()
appStore.setDictData()
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
