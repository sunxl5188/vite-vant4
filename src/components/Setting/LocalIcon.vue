<template>
  <svg-icon
    v-if="appStore.language === 'zh-CN'"
    name="zh"
    size="20px"
    @click="handleSetLanguage('en-US')"
  />
  <svg-icon
    v-if="appStore.language === 'en-US'"
    name="en"
    size="20px"
    @click="handleSetLanguage('zh-CN')"
  />
</template>

<script setup lang="ts" name="LocalIcon">
import { useAppStore } from '@/store/useAppStore'
import { Locale } from 'vant'
import zhCN from 'vant/es/locale/lang/zh-CN'
import enUS from 'vant/es/locale/lang/en-US'

const appStore = useAppStore()
const { locale } = useI18n()

// 切换语言
const handleSetLanguage = (value: 'zh-CN' | 'en-US') => {
  const vantLocale = value === 'zh-CN' ? zhCN : enUS
  appStore.setLanguage(value)
  locale.value = value
  Locale.use(value, vantLocale)
}

onMounted(() => {
  const vantLocale = appStore.language === 'zh-CN' ? zhCN : enUS
  Locale.use(appStore.language, vantLocale)
})
</script>
