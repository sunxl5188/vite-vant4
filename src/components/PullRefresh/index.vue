<template>
  <van-pull-refresh
    v-model="state.pullLoading"
    :disabled="disabled"
    @refresh="onRefresh"
  >
    <van-empty v-if="state.empty" :description="description" />
    <van-list
      v-else
      v-model:loading="loading"
      :finished="finished"
      :offset="5"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div v-for="(item, i) in sourceData" :key="i">
        <slot :row="item">
          <div class="leading-7 p-4 border-b border-gray-200">
            {{ item.title }}
          </div>
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
  empty: boolean
  totalPage: number
  pages: {
    currentPage: number
    pageSize: number
  }
  onLoad: () => void
  onRefresh: () => void
}

const props = defineProps({
  /**
   * @是否禁用下拉刷新
   */
  disabled: {
    type: Boolean,
    default: false
  },
  /**
   * @每页条数
   */
  pageSize: {
    type: Number,
    default: 10
  },
  description: {
    type: String,
    default: '暂无数据'
  },
  /**
   * @接口地址
   */
  api: {
    type: String,
    default: '/home/index/article'
  },
  /**
   * @接口参数
   */
  params: {
    type: Object,
    default: () => ({})
  }
})

const state = reactive<StateType>({
  pullLoading: false, // 下拉加载状态
  sourceData: [], // 列表数据
  loading: false, // 加载状态
  finished: false, // 是否全部加载完成
  empty: false,
  totalPage: 0, // 总页数
  pages: {
    currentPage: 1,
    pageSize: props.pageSize
  },
  // 上拉加载
  onLoad: throttle(() => {
    state.loading = true
    const timeout = state.pages.currentPage === 1 ? 0 : 500
    setTimeout(async () => {
      const { code, data } = await post(props.api, {
        ...state.pages,
        ...props.params
      })
      if (code === 200) {
        state.sourceData =
          data.currentPage === 1
            ? data.list
            : [...state.sourceData, ...data.list]
        state.totalPage = Math.ceil(data.total / state.pages.pageSize)
      }
      state.pages.currentPage += 1
      state.loading = false

      if (
        data.list.length < data.pageSize ||
        state.pages.currentPage > state.totalPage
      ) {
        state.finished = true
      }
      if (state.sourceData.length === 0) {
        state.empty = true
      } else {
        state.empty = false
      }
    }, timeout)
  }, 500),

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
