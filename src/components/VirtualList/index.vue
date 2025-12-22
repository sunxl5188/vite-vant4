<template>
  <van-empty v-if="state.empty" :description="description" />
  <DynamicScroller
    v-else
    ref="boxRef"
    :items="sourceData"
    :min-item-size="54"
    :prerender="10"
    class="h-full"
    :style="pull.style"
    @scroll-end="state.scrollLoad"
    @touchstart="pull.touchstart"
    @touchmove="pull.touchmove"
    @touchend="pull.touchend"
  >
    <template #before>
      <div class="refresh-head">
        <div
          v-if="pull.loading"
          class="flex justify-center items-center h-[50px] leading-[50px]"
        >
          <van-loading type="spinner" size="16" />
          <div class="text-sm text-gray-500 ml-2">{{ pull.loadingText }}</div>
        </div>
        <div
          v-else
          class="flex justify-center items-center flex-col text-sm text-gray-500 h-[50px] leading-[50px]"
        >
          <span>
            {{
              pull.move >= 0 && pull.move < 50
                ? pull.pullingText
                : pull.loosingText
            }}
          </span>
        </div>
      </div>
    </template>
    <template #default="{ item, index, active }">
      <DynamicScrollerItem :item="item" :active="active" :data-index="index">
        <slot :row="item">
          <div class="leading-7 p-4 border-b border-gray-200">
            {{ item.title }}
          </div>
        </slot>
      </DynamicScrollerItem>
    </template>
    <template #after>
      <div class="py-4">
        <template v-if="state.finished">
          <div class="text-gray-500 text-center text-sm">
            {{ state.finishedText }}
          </div>
        </template>
        <template v-else>
          <div class="flex justify-center items-center">
            <van-loading type="spinner" size="16" />
            <div class="text-gray-500 text-sm ml-2">{{ pull.loadingText }}</div>
          </div>
        </template>
      </div>
    </template>
  </DynamicScroller>
</template>

<script setup lang="ts" name="VirtualList">
import { DynamicScroller, DynamicScrollerItem } from 'vue-virtual-scroller'
import { post } from '@/utils/request'
import { throttle } from 'lodash-es'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

interface StateType {
  pullLoading: boolean
  sourceData: Array<any>
  loading: boolean
  empty: boolean
  finished: boolean
  finishedText: string
  pages: {
    currentPage: number
    pageSize: number
  }
  totalPage: number
  onLoad: () => void
  scrollLoad: () => void
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
    default: '/home/index/article'
  },
  /**
   * @接口参数
   */
  params: {
    type: Object,
    default: () => ({})
  },
  /**
   * @每页条数
   */
  pageSize: {
    type: Number,
    default: 10
  },
  finishedText: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: '暂无数据'
  }
})

const state = reactive<StateType>({
  pullLoading: false, // 下拉加载状态
  sourceData: [], // 列表数据
  loading: false, // 加载状态
  empty: false,
  finished: false, // 是否全部加载完成
  finishedText: '没有更多了',
  pages: {
    currentPage: 1,
    pageSize: props.pageSize
  },
  totalPage: 0,
  // 上拉加载
  async onLoad() {
    state.loading = true
    const { code, data } = await post(props.api, {
      ...state.pages,
      ...props.params
    })
    if (code === 200) {
      state.sourceData =
        data.currentPage === 1 ? data.list : [...state.sourceData, ...data.list]
      state.totalPage = Math.ceil(data.total / state.pages.pageSize)
      state.pages.currentPage += 1
      if (state.pages.currentPage > state.totalPage) {
        console.log('全部加载完成')
        state.finished = true
      }
      if (state.sourceData.length === 0) {
        state.empty = true
      } else {
        state.empty = false
      }
    }
    state.loading = false
  },
  // 监听滚动
  scrollLoad: throttle(() => {
    if (state.totalPage >= state.pages.currentPage) {
      state.onLoad()
    }
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

const boxRef = ref<InstanceType<typeof DynamicScroller> | null>(null)

const pull = reactive({
  pullingText: '下拉即可刷新...',
  loosingText: '释放即可刷新...',
  loadingText: '加载中...',
  isPulldown: false,
  loading: false,
  startY: 0,
  move: 0,
  style: {
    transform: 'translateY(0px)',
    transition: 'none'
  } as any,
  touchstart(ev: any) {
    pull.style.transition = 'none'
    const isPulldown = boxRef.value?.$el?.scrollTop === 0
    pull.isPulldown = isPulldown
    if (isPulldown) {
      pull.startY = ev.targetTouches[0].screenY
    }
  },
  touchmove(ev: any) {
    if (!pull.isPulldown) return
    const y = ev.targetTouches[0].screenY
    let move = y - pull.startY
    if (move > 0) {
      const max = 150
      // 平滑阻力算法，防止跳动
      const finalMove = max * (1 - Math.exp(-move / max))
      pull.move = finalMove
      pull.style = {
        transform: `translateY(${finalMove}px)`,
        'overflow-y': 'visible'
      }
    }
  },
  touchend() {
    if (!pull.isPulldown) return
    if (pull.move > 50) {
      pull.style.transition = '0.3s'
      pull.style.transform = 'translateY(50px)'
      pull.loading = true
    }
    const times = pull.move > 50 ? 1000 : 0
    setTimeout(() => {
      if (pull.move > 50) state.onRefresh()
      pull.loading = false
      pull.style.transition = '0.3s'
      pull.style.transform = 'translateY(0px)'
      pull.style.overflowY = 'auto'
      // 动画复位后再清零，防止跳动
      setTimeout(() => {
        pull.move = 0
      }, 300)
    }, times)
  }
})

state.onLoad()
const { sourceData } = toRefs(state)
</script>

<style scoped lang="scss">
.refresh-head {
  position: absolute;
  top: -50px;
  left: 0;
  width: 100%;
  height: 50px;
}
</style>
