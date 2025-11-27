<template>
  <svg-icon
    v-if="appStore.theme === 'light'"
    name="dark-display"
    size="20px"
    @click="handleSetTheme('dark')"
  />
  <svg-icon
    v-else
    name="light-theme"
    size="20px"
    @click="handleSetTheme('light')"
  />
</template>

<script setup lang="ts" name="ThemeIcon">
import { useAppStore } from '@/store/useAppStore'
const appStore = useAppStore()
// 切换主题
const handleSetTheme = (value: 'light' | 'dark') => {
  appStore.setTheme(value)
}
</script>
