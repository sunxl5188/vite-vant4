<template>
  <van-nav-bar
    :title="title"
    :fixed="fixed"
    :placeholder="placeholder"
    safe-area-inset-top
    @click-left="state.onClickLeft"
  >
    <template v-if="leftArrow" #left>
      <van-icon name="arrow-left" size="18px" color="var(--van-gray-8)" />
    </template>
    <template #right>
      <!-- 右侧内容 -->
      <slot name="right"></slot>
    </template>
  </van-nav-bar>
</template>

<script setup lang="ts" name="NavbarIndex">
defineProps({
  title: { type: String, default: '' },
  leftArrow: { type: Boolean, default: true },
  fixed: { type: Boolean, default: true },
  placeholder: { type: Boolean, default: true }
})
const router = useRouter()
const state = reactive({
  onClickLeft() {
    router.back()
  }
})
</script>
