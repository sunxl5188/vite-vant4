<template>
  <van-pull-refresh
    v-model="state.pullLoading"
    :disabled="disabled"
    @refresh="onRefresh"
  >
    <van-list
      v-model:loading="loading"
      :finished="finished"
      :offset="5"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div v-for="(item, i) in sourceData" :key="i">
        <slot :row="item">
          <van-cell :title="item.title" />
        </slot>
      </div>
    </van-list>
  </van-pull-refresh>
</template>

<script setup lang="ts" name="PullRefresh">
import { post } from '@/utils/request'
import { throttle } from 'lodash-es'

interface StateType {
  pullLoading: boolean
  sourceData: Array<any>
  loading: boolean
  finished: boolean
  pages: {
    currentPage: number
    pageSize: number
  }
  onLoad: () => void
  onRefresh: () => void
}

defineProps({
  // 是否禁用下拉刷新
  disabled: {
    type: Boolean,
    default: false
  }
})

const state = reactive<StateType>({
  pullLoading: false, // 下拉加载状态
  sourceData: [], // 列表数据
  loading: false, // 加载状态
  finished: false, // 是否全部加载完成
  pages: {
    currentPage: 1,
    pageSize: 10
  },
  // 上拉加载
  onLoad: throttle(
    () => {
      state.loading = true
      const timeout = state.pages.currentPage === 1 ? 0 : 500
      setTimeout(async () => {
        const { code, data } = await post('/api/index/article', {
          ...state.pages
        })
        if (code === 200) {
          state.sourceData =
            data.currentPage === 1
              ? data.list
              : [...state.sourceData, ...data.list]
        }
        state.loading = false
        if (data.list.length < data.pageSize) {
          state.finished = true
        } else {
          state.pages.currentPage += 1
        }
      }, timeout)
    },
    1000,
    { trailing: true }
  ),

  // 下拉刷新
  onRefresh() {
    state.pages.currentPage = 1
    state.sourceData = []
    state.finished = false
    state.pullLoading = false
    state.onLoad()
  }
})

const { onRefresh, sourceData, loading, finished, onLoad } = toRefs(state)
</script>
