<template>
  <van-pull-refresh
    v-bind="_pullAttribute"
    @refresh="handleRefresh"
    @change="handleChange"
    class="h-full"
  >
    <van-list
      v-model:loading="list.loading"
      v-model.error="list.error"
      :finished="list.finished"
      v-bind="_listAttribute"
    >
      <slot>111</slot>
    </van-list>
  </van-pull-refresh>
</template>

<script setup lang="ts" name="XlPullRefresh">
import type { PullRefreshProps, ListProps } from 'vant'

const load = ref<boolean>(false)
const count = ref<number>(0)
const emit = defineEmits(['change'])

interface PropsType {
  pullAttribute?: any
  listAttribute?: any
}

const props = withDefaults(defineProps<PropsType>(), {
  pullAttribute: () => {
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

//下拉刷新属性
const _pullAttribute = ref<PullRefreshProps>({
  ...{
    pullingtext: '下拉即可刷新...',
    loosingtext: '释放即可刷新...',
    loadingtext: '数据加载中...',
    successText: undefined,
    successDuration: 500,
    animationDuration: 300,
    headHeight: 50,
    disabled: false,
    modelValue: false
  },
  ...props.pullAttribute
})
//列表属性
const _listAttribute = ref<any>({
  offset: 300,
  loadingText: '数据加载中...',
  finishedText: '没有更多了',
  errorText: '数据加载失败，请联系管理员',
  immediateCheck: true,
  disabled: false,
  direction: 'down',
  scroller: undefined
})
//列表属性
const list = reactive<ListProps>({
  loading: false,
  error: false,
  finished: false,
  offset: 300,
  loadingText: '数据加载中...',
  finishedText: '没有更多了',
  errorText: '数据加载失败，请联系管理员',
  immediateCheck: true,
  disabled: false,
  direction: 'down',
  scroller: undefined
})

//下拉刷新数据
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
