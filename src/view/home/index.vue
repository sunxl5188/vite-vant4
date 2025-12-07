<template>
  <LocalIcon />
  <van-cell-group inset>
    <van-cell :title="$t('a.a1')" url="/" />
    <van-cell :title="$t('a.a2')" url="/form" />
    <van-cell :title="$t('a.a3')" url="/list" />
    <van-cell :title="$t('a.a4')" url="/login" />
    <van-cell :title="$t('a.a5')" url="/register" />
  </van-cell-group>
</template>

<script setup lang="ts" name="HomeIndex">
import { LocalIcon } from '@/components/Setting'
</script>

<style lang="scss" scoped></style>
