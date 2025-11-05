<template>
  <div class="p-4">
    <QrCode />
    <div v-dict="{ '2': '2' }">
      <!-- 11111 -->
    </div>
    <div>{{ state }}</div>
    <div>
      <van-button type="primary" @click="handleUpdate">主要按钮</van-button>
      <van-button type="primary" @click="startVibrate">开始震动</van-button>
      <van-button type="primary" @click="stopVibrate">停止震动</van-button>
    </div>
  </div>
</template>

<script setup lang="ts" name="HomeIndex">
import QrCode from '@/components/QrCode'

const state = shallowRef({
  name: 'home index',
  age: 100
})

const handleUpdate = () => {
  state.value.age += 1
  triggerRef(state)
}

const startVibrate = () => {
  if (navigator.vibrate) {
    // 震动1000毫秒
    navigator.vibrate(1000)
  } else {
    alert('您的浏览器不支持振动API')
  }
}

const stopVibrate = () => {
  if (navigator.vibrate) {
    // 停止震动
    navigator.vibrate(0) // 或者直接不调用 navigator.vibrate()
  } else {
    alert('您的浏览器不支持振动API')
  }
}
</script>
