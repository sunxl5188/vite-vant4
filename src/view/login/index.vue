<template>
  <div class="flex justify-center items-center h-screen p-4">
    <BaseForm
      ref="formRef"
      :form-item="state.formItem"
      :rules="state.rules"
      @submit="state.handleSubmit"
    />
    <van-button type="primary" @click="state.visible = true">
      主要按钮
    </van-button>
    <v-code
      :show="state.visible"
      :imgs="imgs"
      @success="state.onSuccess"
      @close="state.onClose"
    />
  </div>
</template>

<script setup lang="ts" name="LoginIndex">
import type { FormItemType } from '@/components/BaseForm'
import BaseForm from '@/components/BaseForm'
import VCode from 'vue3-puzzle-vcode'
import { useUserStore } from '@/store/useUserStore'
import codeImg from '@/assets/images/code-bg.jpeg'

const imgs = ref<string[]>([codeImg])

interface StateType {
  visible: boolean
  formItem: FormItemType[]
  rules: { [key: string]: any }
  onSuccess: (_: any) => void
  onClose: () => void
  handleSubmit: (_: any) => void
}

const userStore = useUserStore()

const router = useRouter()
const state = reactive<StateType>({
  visible: false,
  formItem: [
    {
      label: '用户名',
      prop: 'account',
      value: '',
      fieldAttr: {
        placeholder: '请输入用户名'
      }
    },
    {
      label: '密码',
      prop: 'password',
      value: '',
      fieldAttr: {
        placeholder: '请输入密码',
        type: 'password'
      }
    }
  ],
  rules: {
    account: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
    password: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
  },
  onSuccess(code: any) {
    console.log('验证成功回调', code)
    state.visible = false
  },
  onClose() {
    console.log('关闭回调')
    state.visible = false
  },
  async handleSubmit(data: any) {
    const { code } = await userStore.login(data)
    if (code === 200) {
      router.push('/')
    }
  }
})
</script>

<style scoped lang="scss"></style>
