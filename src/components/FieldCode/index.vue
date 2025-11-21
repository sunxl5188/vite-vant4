<template>
  <van-field v-model="state.value" label="验证码" placeholder="请输入验证码">
    <template #button>
      <van-button size="small" @click="state.handleStart">
        {{ state.tips }}
      </van-button>
    </template>
  </van-field>
</template>

<script setup lang="ts" name="FieldCode">
const props = defineProps({
  seconds: { type: Number, default: 60 }
})

const state = reactive({
  value: '',
  tips: '获取验证码',
  endText: '重新获取',
  changeText: 'X秒重新获取',
  leftSeconds: ref(JSON.parse(JSON.stringify(props.seconds))),
  timer: null as any,
  handleStart() {
    if (state.timer) return // 防止重复点击
    //console.log('开始倒计时', state.leftSeconds)
    state.timer = setInterval(() => {
      state.leftSeconds -= 1
      if (state.leftSeconds <= 0) {
        clearInterval(state.timer)
        state.timer = null
        state.handleEnd()
      } else {
        state.handleChange(state.leftSeconds)
      }
    }, 1000)
  },
  handleEnd() {
    state.tips = state.endText
    state.leftSeconds = JSON.parse(JSON.stringify(props.seconds))
    //console.log('结束倒计时')
  },
  handleChange(second: number) {
    //console.log('倒计时变化', second)
    state.tips = state.changeText.replace('X', second.toString())
  }
})

onMounted(() => {
  // 读取本地存储
  const lastLeave = Number(localStorage.getItem('leaveTime'))
  const lastLeft = Number(localStorage.getItem('leftSeconds'))
  if (lastLeave && lastLeft && lastLeft < props.seconds) {
    const now = Date.now()
    const diff = Math.floor((now - lastLeave) / 1000)
    const remain = lastLeft - diff
    if (remain > 0) {
      state.tips = state.changeText.replace('X', remain.toString())
      state.leftSeconds = remain
      state.handleStart()
    } else {
      state.leftSeconds = 0 // 显示重新获取
    }
  }
})

// 清理定时器
onUnmounted(() => {
  if (state.timer) clearInterval(state.timer)
})

// 页面离开时记录时间
window.addEventListener('beforeunload', () => {
  localStorage.setItem('leaveTime', `${Date.now()}`)
  localStorage.setItem('leftSeconds', `${state.leftSeconds}`)
})
</script>
