<template>
  <div class="flex justify-center items-center h-screen p-4">
    <BaseForm
      ref="formRef"
      :form-item="state.formItem"
      :rules="state.rules"
      @submit="state.handleSubmit"
    />
  </div>
</template>

<script setup lang="ts" name="LoginIndex">
import type { FormItemType } from '@/components/BaseForm'
import BaseForm from '@/components/BaseForm'
import { useUserStore } from '@/store/useUserStore'

interface StateType {
  formItem: FormItemType[]
  rules: { [key: string]: any }
  handleSubmit: (_: any) => void
}

const userStore = useUserStore()

const router = useRouter()
const state = reactive<StateType>({
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
  async handleSubmit(data: any) {
    const { code } = await userStore.login(data)
    if (code === 200) {
      router.push('/')
    }
  }
})
</script>

<style scoped lang="scss"></style>
