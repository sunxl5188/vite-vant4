<template>
  <VirtualList>
    <template #default="{ row }">
      <van-cell :title="row.title" />
    </template>
  </VirtualList>
</template>

<script setup lang="ts" name="ListIndex">
import VirtualList from '@/components/VirtualList'
</script>
