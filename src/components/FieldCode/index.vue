<template>
  <van-field
    v-model="state.value"
    :label="label"
    required="auto"
    v-bind="state.getFieldValue"
  >
    <template #button>
      <template v-if="type === 'input-round'">
        <a
          href="javascript:;"
          class="text-gray-600 text-sm"
          @click="state.handleClick"
        >
          {{ state.tips }}
        </a>
      </template>
      <van-button v-else type="primary" size="small" @click="state.handleClick">
        {{ state.tips }}
      </van-button>
    </template>
  </van-field>
  <v-code
    :show="state.visible"
    :imgs="imgs"
    @success="state.onSuccess"
    @close="state.onClose"
  />
</template>

<script setup lang="ts" name="FieldCode">
import VCode from 'vue3-puzzle-vcode'
import codeImg from '@/assets/images/code-bg.jpeg'

const imgs = ref<string[]>([codeImg])

const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  // 绑定值
  modelValue: {
    type: String,
    default: ''
  },
  //输入框属性
  fieldAttr: {
    type: Object as PropType<Record<string, unknown>>,
    default: () => ({})
  },
  // 组件属性
  attr: {
    type: Object as PropType<Record<string, unknown>>,
    default: () => ({})
  },
  seconds: { type: Number, default: 60 },
  isFinite: { type: Boolean, default: true }
})
const type = inject<string>('type', 'line')

const emit = defineEmits(['update:modelValue'])
const state = reactive({
  value: '',
  visible: false,
  tips: '获取验证码',
  endText: '重新获取',
  changeText: 'X秒重新获取',
  leftSeconds: ref(JSON.parse(JSON.stringify(props.seconds))),
  timer: null as any,
  getFieldValue: computed(() => {
    return {
      border: true,
      rules: [],
      ...props.fieldAttr
    }
  }),
  onSuccess(code: any) {
    console.log('验证成功回调', code)
    state.visible = false
    state.handleStart()
  },
  onClose() {
    console.log('关闭回调')
    state.visible = false
  },
  handleClick() {
    if (props.isFinite) {
      state.visible = true
    } else state.handleStart()
  },
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

watch(
  () => state.value,
  val => {
    emit('update:modelValue', val)
  }
)

// 页面离开时记录时间
window.addEventListener('beforeunload', () => {
  localStorage.setItem('leaveTime', `${Date.now()}`)
  localStorage.setItem('leftSeconds', `${state.leftSeconds}`)
})
</script>
