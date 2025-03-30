<template>
  <div>
    <div class="container" :style="isExceed && setBodyStyle">
      <div
        ref="contentRef"
        class="container-text"
        :style="`line-height:${lineHeight}px`"
      >
        {{ content }}
      </div>
      <div
        class="container-content"
        :class="contentClass"
        :style="`line-height:${lineHeight}px`"
      >
        {{ content }}
      </div>
    </div>
    <div
      v-if="isExceed"
      class="container-button"
      :class="{ open: !ellipsis }"
      @click="handleTrigger"
    >
      <span>{{ ellipsis ? btnText[0] : btnText[1] }}</span>
      <double-right-outlined />
    </div>
  </div>
</template>

<script setup lang="ts" name="TextOverflowEllipsis">
import { DoubleRightOutlined } from '@ant-design/icons-vue'
const props = defineProps({
  content: { type: String, default: '' }, // 文本内容
  lineHeight: { type: Number, default: 30 }, // 每一行行高
  btnText: { type: Array, default: () => ['展开', '收起'] },
  rows: { type: Number, default: 3 } // 显示多少行 1-6
})

const contentRef = ref(null)
const ellipsis = ref(true) // 状态: true 收起 false 展开
const contentHeight = ref(null) // 文本内容高度
const contentClass = ref('line-clamp-' + props.rows) // 控制显示文本内容样式

// 文本内容高度设置
const setBodyStyle = computed(() => {
  return ellipsis.value === true
    ? `height: ${props.lineHeight * props.rows}px`
    : `height: ${contentHeight.value}px`
})

// 计算文本内容是否超出规定高度
const isExceed = computed(() => {
  return contentHeight.value > props.lineHeight * props.rows
})

// 触发~点击展开收起
const handleTrigger = () => {
  ellipsis.value = !ellipsis.value
  if (ellipsis.value === true) {
    setTimeout(() => {
      contentClass.value = `line-clamp-${props.rows}`
    }, 300)
  } else contentClass.value = ''
}

onMounted(() => {
  console.log(contentRef.value.clientHeight)
  contentHeight.value = contentRef.value.clientHeight
})
</script>

<style scoped lang="less">
.container {
  width: 100%;
  transition: all 0.3s ease 0s;
  overflow: hidden;
  &-text {
    position: fixed;
    z-index: -1;
  }
  &-content {
    word-break: break-all;
    overflow: hidden;
    text-overflow: ellipsis;
    text-overflow: -o-ellipsis-lastline;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    &.line-clamp-1 {
      line-clamp: 1;
      -webkit-line-clamp: 1;
    }
    &.line-clamp-2 {
      line-clamp: 2;
      -webkit-line-clamp: 2;
    }
    &.line-clamp-3 {
      line-clamp: 3;
      -webkit-line-clamp: 3;
    }
    &.line-clamp-4 {
      line-clamp: 4;
      -webkit-line-clamp: 4;
    }
    &.line-clamp-5 {
      line-clamp: 5;
      -webkit-line-clamp: 5;
    }
    &.line-clamp-6 {
      line-clamp: 6;
      -webkit-line-clamp: 6;
    }
  }
  &-button {
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    & span {
      cursor: pointer;
    }
    &::v-deep(.anticon) {
      cursor: pointer;
      transition: all 0.2s ease 0s;
      transform: rotate(90deg);
    }
    &.open {
      &::v-deep(.anticon) {
        transform: rotate(-90deg);
      }
    }
  }
}
</style>
