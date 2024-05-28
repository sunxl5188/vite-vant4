<template>
  <van-pull-refresh
    v-model="load"
    v-bind="_attribute"
    @refresh="handleRefresh"
    @change="handleChange"
    class="h-full"
  >
    <van-list
      v-model:loading="list.loading"
      v-model.error="list.error"
      :finished="list.finished"
      v-bind="props.listAttribute"
    >
      <slot></slot>
    </van-list>
  </van-pull-refresh>
</template>

<script setup lang="ts" name="XlPullRefresh">
import type { ListProps } from 'vant'

const load = ref<boolean>(false)
const count = ref<number>(0)
const emit = defineEmits(['change'])

interface PropsType {
  attribute?: object
  listAttribute?: any
}

const props = withDefaults(defineProps<PropsType>(), {
  attribute: () => {
    return {}
  },
  listAttribute: () => {
    return {
      offset: 300,
      loadingText: '数据加载中...',
      finishedText: '没有更多了',
      errorText: '数据加载失败，请联系管理员',
      immediateCheck: true,
      disabled: false,
      direction: 'down',
      scroller: null
    }
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

const list = reactive<ListProps>({
  loading: false,
  error: false,
  finished: false,
  offset: props.listAttribute.offset,
  disabled: props.listAttribute.disabled,
  direction: props.listAttribute.direction,
  immediateCheck: props.listAttribute.immediate
})
</script>

<style scoped lang="scss">
.van-pull-refresh {
  overflow-y: auto;
}
</style>
