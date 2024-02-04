<template>
  <van-pull-refresh
    v-model="load"
    v-bind="_attribute"
    @refresh="handleRefresh"
    @change="handleChange"
    class="h-full"
  >
    <slot></slot>
  </van-pull-refresh>
</template>

<script setup lang="ts" name="XlPullRefresh">
import { ref } from 'vue'

const load = ref<boolean>(false)
const count = ref<number>(0)
const emit = defineEmits(['change'])

interface PropsType {
  attribute?: object
}

const props = withDefaults(defineProps<PropsType>(), {
  attribute: () => {
    return {}
  }
})

const _attribute = ref({
  ...{
    'pulling-text': '下拉即可刷新...',
    'loosing-text': '释放即可刷新...',
    'loading-text': '数据加载中...',
    'success-text': undefined,
    'success-duration': 500,
    'head-height': 50,
    disabled: false
  },
  ...props.attribute
})

const handleRefresh = (): void => {
  load.value = true
  setTimeout(() => {
    load.value = false
    count.value++
  }, 1000)
}

const handleChange = ({
  status,
  distance
}: {
  status: string
  distance: number
}): void => {
  emit('change', status, distance)
}
</script>

<style scoped lang="scss">
.van-pull-refresh {
  overflow-y: auto;
}
</style>
