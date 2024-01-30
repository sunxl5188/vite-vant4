<template>
  <div>
    <h3>{{ $dayjs }}</h3>
    
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, ComponentInternalInstance } from 'vue'

const { proxy } = getCurrentInstance() as ComponentInternalInstance
console.log(proxy?.$dayjs())
</script>

<style scoped></style>