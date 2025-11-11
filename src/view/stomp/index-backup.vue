<template>
  <div>
    <van-field
      v-model="message"
      rows="2"
      autosize
      label="留言"
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button type="primary" block @click="handleSendMessage">
      发送留言
    </van-button>
  </div>
</template>

<script setup lang="ts" name="HomeIndex">
import { io } from 'socket.io-client'

const message = ref<string>('')

//192.168.170.128
const socket: any = io('ws://192.168.170.128:8081', {
  transports: ['websocket'],
  timeout: 10000 // 增加超时时间到10秒
})

socket.emit('joinRoom', { room: 'gameRoom' })

socket.on('connect', () => {
  console.log(socket.id)
})
socket.on('disconnect', () => {
  console.log(socket.id) // undefined
})

socket.on('message', (msg: string) => {
  console.log('收到信息', msg) // undefined
})

socket.on('roomMessage', (msg: string) => {
  console.log('收到房间信息', msg) // undefined
})
// 离开房间
//socket.emit('leaveRoom', { room: 'gameRoom' })

const handleSendMessage = () => {
  //socket.emit('message', { message: message.value })
  // 在客户端发送消息到房间
  socket.emit('messageToRoom', {
    room: 'gameRoom',
    message: message.value
  })

  message.value = ''
}
</script>
