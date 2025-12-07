<template>
  <van-tabs v-model:active="active" @click-tab="handleClickTab">
    <van-tab title="基础" />
    <van-tab title="内行" />
    <van-tab title="圆角" />
  </van-tabs>
  <BaseForm v-if="active === 0" />
  <FormInline v-if="active === 1" />
  <FormInput v-if="active === 2" />
</template>

<script setup lang="ts" name="FormIndex">
import BaseForm from './components/BaseForm.vue'
import FormInline from './components/FormInline.vue'
import FormInput from './components/FormInput.vue'

const active = ref(0)

const handleClickTab = ({ name }: { name: number }) => {
  active.value = name
}
</script>
