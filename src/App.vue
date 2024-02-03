<template>
  <div class="h-full">
    <XlPullRefresh>1111</XlPullRefresh>
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, ComponentInternalInstance } from 'vue'

const { proxy } = getCurrentInstance() as ComponentInternalInstance
console.log(proxy)
</script>

<style scoped></style>
