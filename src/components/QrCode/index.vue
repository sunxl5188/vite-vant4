<template>
  <van-button
    color="rgba(0, 0, 0, 0.3)"
    style="border-color: rgba(255, 255, 255, 0.4)"
    @click="openQrCode"
  >
    扫一扫
  </van-button>
  <div v-if="isScanning" class="reader-box">
    <div class="line"></div>
    <qr-stream class="mb" @decode="onDecode">
      <div class="frame" style="color: red"></div>
    </qr-stream>
    <div class="desc">扫描激活二维码</div>
    <van-button
      color="rgba(0, 0, 0, 0.3)"
      style="border-color: rgba(255, 255, 255, 0.4)"
      @click="closeQrCode"
    >
      返回
    </van-button>
  </div>
</template>

<script setup lang="ts" name="index">
// https://blog.csdn.net/m0_51992766/article/details/139176509
import { QrStream } from 'vue3-qr-reader'

const isScanning = ref(false)

// 开启扫码
const openQrCode = () => {
  isScanning.value = true
}
// 关闭扫码
const closeQrCode = () => {
  isScanning.value = false
}

// 处理扫码成功后相关的业务内容
const onDecode = (data: any) => {
  try {
    console.log(data)
    // data 为扫码结果 对data做相关处理进行下一步操作
  } catch (err) {
    closeQrCode()
    console.log('扫码失败，请联系管理员')
  }
}
</script>

<style scoped lang="scss">
/* 相关样式 */
.reader-box {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.reader-box .desc {
  position: fixed;
  bottom: 140px;
  font-weight: bold;
  font-size: 15px;
  color: #ffffff;
  margin-top: 16px;
}
.reader-box .van-button {
  position: absolute;
  bottom: 70px;
  width: 90%;
  border: 1px solid #fff;
}
.line {
  position: absolute;
  top: 180px;
  width: 100%;
  animation: radar-beam 2s infinite;
  animation-timing-function: cubic-bezier(0.53, 0, 0.43, 0.99);
  animation-delay: 1.4s;
  z-index: 9999;
  height: 130px;
  border-bottom: 1px solid #4b66d0;
  background: linear-gradient(to top, #4b66d0, transparent);
}

@keyframes radar-beam {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(90%);
  }
}
</style>
