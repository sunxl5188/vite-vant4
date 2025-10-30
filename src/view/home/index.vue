<template>
  <div>
    <van-button type="primary" @click="updateInfo">主要按钮</van-button>
    <div v-memo="[state.age]">
      <h2>姓名: {{ state.name }}</h2>
      <h2>年龄: {{ state.age }}</h2>
      <h2>身高: {{ state.height }}</h2>
    </div>
  </div>
</template>

<script setup lang="ts" name="HomeIndex">
const state = reactive({
  name: 'www',
  age: 18,
  height: 1.88
})

const updateInfo = function () {
  state.name = 'xxx'
  state.age = 18
  state.height = 10000000
}
</script>

<style scoped></style>
