<template>
  <van-popup v-model:show="visible" v-bind="_attribute" @close="handleClose">
    <slot> 内容 </slot>
  </van-popup>
</template>

<script setup lang="ts" name="XlPopup">
import { ref, watch } from 'vue'

const checkValue = defineModel({ type: Boolean, default: false })
const emit = defineEmits(['update:model-value', 'close'])
const visible = ref<boolean>(false)
const _attribute = ref<object>({
  position: 'bottom', //top bottom right left
  'z-index': 100,
  round: true,
  closeable: true,
  'safe-area-inset-top': true,
  'safe-area-inset-bottom': true,
  style: { height: '50%', width: '100%' }
})

watch(
  () => checkValue.value,
  val => {
    visible.value = val
  },
  { immediate: true }
)

//关闭弹出层时立即触发
const handleClose = () => {
  emit('close', false)
  emit('update:model-value', false)
}
</script>

<style scoped></style>
