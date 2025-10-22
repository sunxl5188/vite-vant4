<template>
  <van-uploader
    v-model="fileList"
    :before-read="beforeRead"
    :after-read="afterRead"
    @delete="handleDelete"
  />
</template>

<script setup lang="ts" name="Uploader">
import type { UploaderFileListItem } from 'vant'
import { showDialog } from 'vant'
import { post } from '@/utils/request'

interface StateType {
  fileList: UploaderFileListItem[]
  beforeRead: (_file: File | File[]) => boolean | Promise<File | File[]>
  afterRead: (_file: UploaderFileListItem | UploaderFileListItem[]) => void
  handleDelete: (_file: UploaderFileListItem) => void
}

const props = defineProps({
  modelValue: {
    type: Array as PropType<UploaderFileListItem[]>,
    default: () => []
  },
  accept: { type: String, default: '.jpg,.jpeg,.png,.gif' }, //上传文件类型
  fileSize: { type: Number, default: 1 } //上传大小限制，单位MB
})

const emit = defineEmits(['update:modelValue'])

const state = reactive<StateType>({
  // 文件列表
  fileList: [],
  // 上传前的钩子
  beforeRead(file: File | File[]): boolean | Promise<File | File[]> {
    let fileList: File[] = []
    if (Object.prototype.toString.call(file) === '[object File]') {
      fileList = [file as File]
    } else {
      fileList = file as File[]
    }
    const newFileList: File[] = []
    const errorSuffix = []
    const errorSize = []
    const accept = props.accept.toLowerCase().split(',')
    for (const item of fileList) {
      const fileSuffix = item.name
        .substring(item.name.lastIndexOf('.'))
        .toLowerCase()
      if (!accept.includes(fileSuffix)) {
        errorSuffix.push(item.name)
      }

      const size = item.size / 1024 / 1024
      if (props.fileSize < size) {
        errorSize.push(`文件 ${item.name} 超过 ${props.fileSize}MB 大小限制`)
      } else {
        newFileList.push(item)
      }
    }
    if (errorSuffix.length) {
      showDialog({
        title: '温馨提示',
        message:
          `上传文件只能是 ${props.accept} 格式!\n以下文件不允许上传:\n` +
          errorSuffix.map(item => item + '\n').join('')
      })
    } else if (errorSize.length) {
      showDialog({
        title: '温馨提示',
        message: errorSize.map(item => item + '\n').join('')
      })
    }

    return Promise.resolve(newFileList)
  },
  // 上传后的钩子
  async afterRead(file) {
    let fileList: UploaderFileListItem[]
    if (Object.prototype.toString.call(file) === '[object Object]') {
      fileList = [file as UploaderFileListItem]
    } else {
      fileList = file as UploaderFileListItem[]
    }

    for (const item of fileList) {
      item.message = '上传中...'
      item.status = 'uploading'
      const formData = new FormData()
      formData.append('file', item.file as File)
      const headers = {
        'Content-Type': 'multipart/form-data'
      }
      const { code, data } = await post('/api/index/upload', formData, {
        headers
      })
      if (code === 200) {
        item.message = '上传成功'
        item.status = 'done'
        item.url = data
      } else {
        item.message = '上传失败'
        item.status = 'failed'
      }
      delete item.file
    }
  },
  // 删除文件
  async handleDelete({ url }) {
    await post('/api/index/deleteFile', { url })
  }
})

watch(
  () => props.modelValue,
  newValue => {
    if (newValue) {
      state.fileList = newValue
    }
  },
  { deep: true, immediate: true }
)

watch(
  () => state.fileList,
  () => {
    emit('update:modelValue', state.fileList)
  },
  { deep: true, immediate: true }
)

const { fileList, beforeRead, afterRead, handleDelete } = toRefs(state)
</script>
