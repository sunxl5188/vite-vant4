<template>
  <van-config-provider theme="dark">
    <van-button type="primary" round block @click="handleLocale">
      中/英 {{ locale }}
    </van-button>
    <router-view />
  </van-config-provider>
</template>

<script setup lang="ts">
import { Locale } from 'vant'
import zhCN from 'vant/es/locale/lang/zh-CN'
import enUS from 'vant/es/locale/lang/en-US'

const locale = ref<string>('zh-CN')
const handleLocale = () => {
  if (locale.value === 'zh-CN') {
    locale.value = 'en-US'
    Locale.use('en-US', enUS)
  } else if (locale.value === 'en-US') {
    locale.value = 'zh-CN'
    Locale.use('zh-CN', zhCN)
  }
}
</script>
