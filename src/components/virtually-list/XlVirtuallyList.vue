<template>
  <div ref="scroller" class="virtually">
    <van-pull-refresh v-model="list.refreshing" @refresh="list.handleRefresh">
      <van-list
        v-model:loading="list.loading"
        v-model:error="list.error"
        :finished="list.finished"
        finished-text="没有更多了"
        error-text="请求失败，点击重新加载"
        :scroller="scroller?.$el"
        @load="list.handleLoad"
      >
        <van-cell v-for="item in list.sourceData" :key="item" :title="item" />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script setup lang="ts" name="XlVirtuallyList">
const scroller = ref()
const list = reactive({
  refreshing: false,
  loading: false,
  finished: false,
  error: false,
  disabled: false,
  sourceData: [] as any[],
  handleRefresh: async () => {
    list.sourceData = []
    list.finished = false
    list.loading = true
    await list.handleLoad()
    list.refreshing = false
  },
  handleLoad: () => {
    console.log(111)
    return new Promise(resolve => {
      setTimeout(() => {
        for (let i = 0; i < 20; i++) {
          list.sourceData.push(list.sourceData.length + 1)
        }
        // 加载状态结束
        list.loading = false
        // 数据全部加载完成
        if (list.sourceData.length >= 100) {
          list.finished = true
        }
        resolve(true)
      }, 1000)
    })
  }
})
</script>

<style scoped lang="scss">
.virtually {
  height: 100vh;
  overflow-y: auto;
}
</style>
