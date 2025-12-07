<template>
  <Navbar title="用户协议" left-arrow />
  <!-- 协议相关 -->
  <div class="p-4">
    <div class="text-center font-bold">用户注册服务协议范本</div>
    <div class="text-sm text-gray-500 leading-7 pt-4">
      (一)在此特别提醒用户在注册成为_用户之前，请认真阅读本《用户服务协议》(以下简称“协议”)。确保用户充分理解本协议中各条款，请审慎阅读并选择接受或不接受本协议。同意并确认本协议条款且完成注册程序后，才能成为_的正式注册用户，并享受的各类服务。注册、登录、使用等行为将视为对本协议的接受，并同意接受本协议各项条救的约束。若不同意本协议，或对本协议中的条数存在任何疑问，请立即停止用户注册程序，并可以选择不使用本网站服务。
      (二)本协议约定与用户之问关于“”服务(以下简称“服务”)的权利义务。“用户”是指注册、登录、使用本服务的个人、单位。本协议可由随时更新，更新后的协议条款一旦公布即代替愿来的协议条款，恕不再另行通知，用户可在本APP中查阅最新版协议条款。在修改协议条救后，如果用户不接受修改后的条款，请立即停止使用提供的服务，用户继续使用提供的服务将被视为接受修改后的协议。
      二、账号注册
      (一)用户在使用本服务前需要注册一个“”账号。“”账号应当使用号码绑定注册，请用户使用尚未与“”账号绑定的号码，以及未被根据本协议封禁的号码注册“”账号。可以根据用户需求或产品需要对账号注册和绑定的方式进行变更，而无须事先通知用户。
    </div>
  </div>
</template>

<script setup lang="ts" name="ProtocolIndex">
import Navbar from '@/components/Navbar'

const route = useRoute()

const state = reactive({
  id: '',
  handleLoad() {
    console.log('加载协议内容，ID:', state.id)
  }
})

onMounted(() => {
  const { id } = route.params
  state.id = id as string
  if (id) {
    state.handleLoad()
  }
})
</script>

<style scoped lang="scss"></style>
