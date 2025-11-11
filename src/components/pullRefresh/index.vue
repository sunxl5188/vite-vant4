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
      <DynamicScroller :items="sourceData" :min-item-size="54" class="h-full">
        <template #default="{ item, index, active }">
          <DynamicScrollerItem
            :item="item"
            :active="active"
            :size-dependencies="[item.message]"
            :data-index="index"
          >
            <slot :row="item">
              <div class="leading-7 p-4 border-b border-gray-200">
                {{ item.title }}
              </div>
            </slot>
          </DynamicScrollerItem>
        </template>
      </DynamicScroller>
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

const props = defineProps({
  /**
   * @是否禁用下拉刷新
   */
  disabled: {
    type: Boolean,
    default: false
  },
  /**
   * @接口地址
   */
  api: {
    type: String,
    default: '/api/index/article'
  },
  /**
   * @每页条数
   */
  pageSize: {
    type: Number,
    default: 10
  }
})

const state = reactive<StateType>({
  pullLoading: false, // 下拉加载状态
  sourceData: [], // 列表数据
  loading: false, // 加载状态
  finished: false, // 是否全部加载完成
  pages: {
    currentPage: 1,
    pageSize: props.pageSize
  },
  // 上拉加载
  onLoad: throttle(
    () => {
      state.loading = true
      const timeout = state.pages.currentPage === 1 ? 0 : 1000
      setTimeout(async () => {
        const { code, data } = await post(props.api, {
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
