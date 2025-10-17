<template>
  <van-uploader v-model="fileList" :after-read="handleAfterRead">
  </van-uploader>
</template>

<script setup lang="ts" name="XlUploader">
import type { UploaderFileListItem } from 'vant'

const fileList = ref<UploaderFileListItem[]>([
  { url: 'https://fastly.jsdelivr.net/npm/@vant/assets/leaf.jpeg' }
])
//文件读取完成后的回调函数
const handleAfterRead = (file: any): void => {
  const { objectUrl } = file
  console.log(objectUrl)
  //fileList.value.push({ url: objectUrl })
}
</script>

<style scoped land="scss"></style>
