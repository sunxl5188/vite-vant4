<template>
  <van-tabs v-model="active" @click-tab="handleClickTab">
    <van-tab title="基础表单" />
    <van-tab title="经典内行" />
    <van-tab title="经典换行" />
  </van-tabs>
  <BaseForm v-if="active === 0" />
  <FormInline v-if="active === 1" />
</template>

<script setup lang="ts" name="FormIndex">
import BaseForm from './components/BaseForm.vue'
import FormInline from './components/FormInline.vue'

const active = ref(0)

const handleClickTab = ({ name }: { name: number }) => {
  active.value = name
}
</script>
