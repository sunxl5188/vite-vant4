<template>
  <van-field v-model="imAccount" label="账号" placeholder="当前用户" />
  <van-field v-model="toAccount" label="好友" placeholder="好友用户" />
  <van-field v-model="msgValue" label="消息" placeholder="请输入" />
  <div>
    <van-button plain type="success" @click="handleConn">连接</van-button>
    <van-button type="primary" @click="handleSend">发送</van-button>
  </div>

  <div style="margin-top: 16px">
    <div v-for="(msg, idx) in messages" :key="idx">收到: {{ msg }}</div>
  </div>
</template>

<script setup lang="ts" name="StompIndex">
import stompManager from '@/utils/stompManager'

const imAccount = ref('001')
const toAccount = ref('002')
const msgValue = ref('')
const messages = ref<string[]>([])
const handler = computed(() => ({
  imAccount: imAccount.value,
  toAccount: toAccount.value
}))

const handleConn = () => {
  if (imAccount.value.trim() === '' && toAccount.value.trim() === '') {
    return
  }
  stompManager.init(handler.value)
  stompManager.subscribe(`/topic/message/${imAccount.value}`, msg => {
    console.log('收到消息:', msg.body)
    messages.value.push(msg.body)
  })
}

const handleSend = async () => {
  if (msgValue.value.trim() === '') {
    return
  }
  const { code } = await stompManager.send(
    `/topic/message/${toAccount.value}`,
    handler.value,
    msgValue.value
  )
  if (code === 200) {
    console.log('消息发送成功')
  }
  msgValue.value = ''
}
</script>
