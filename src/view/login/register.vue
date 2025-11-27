<template>
  <div>
    <div class="h-20"></div>
    <h1 class="text-center font-black text-2xl">用户注册</h1>
    <div class="h-10"></div>
    <BaseForm
      ref="formRef"
      :form-item="state.formItem"
      :rules="state.rules"
      type="input-round"
    />
    <div class="p-4">
      <div class="pb-6">
        <van-space class="text-sm text-gray-400" align="center" fill>
          <van-checkbox v-model="state.agree">已阅读并同意</van-checkbox>
          <router-link :to="`/protocol/3`" class="text-blue-500">
            《用户注册协议》
          </router-link>
        </van-space>
      </div>
      <van-button
        type="primary"
        block
        :loading="state.loading"
        loading-type="spinner"
        loading-text="加载中..."
        @click="state.handleSubmit"
      >
        注册
      </van-button>
    </div>
    <div class="text-center">
      <router-link to="/login" class="text-sm text-blue-500">
        已有账号？去登录
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts" name="register">
import type { FormItemType } from '@/components/BaseForm'
import BaseForm from '@/components/BaseForm'
import { useUserStore } from '@/store/useUserStore'
import { showToast } from 'vant'

interface StateType {
  loading: boolean
  agree: boolean
  formItem: FormItemType[]
  rules: { [key: string]: any }
  handleSubmit: () => void
}

const userStore = useUserStore()
const router = useRouter()

const formRef = ref<InstanceType<typeof BaseForm> | null>(null)
const state = reactive<StateType>({
  loading: false,
  agree: false,
  formItem: [
    {
      label: '手机号',
      prop: 'phone',
      value: '',
      fieldAttr: {
        placeholder: '请输入手机号',
        type: 'tel'
      }
    },
    {
      label: '您的密码',
      prop: 'password',
      value: '',
      fieldAttr: {
        placeholder: '请输入密码',
        type: 'password'
      }
    },
    {
      label: '验证码',
      prop: 'code',
      value: '',
      fieldType: 'code',
      fieldAttr: {
        placeholder: '请输入验证码',
        isFinite: false
      }
    }
  ],
  rules: {
    phone: [
      { required: true, message: '手机号不能为空', trigger: 'onBlur' },
      {
        pattern: /^1[3-9]\d{9}$/,
        message: '请输入正确的手机号',
        trigger: 'onBlur'
      }
    ],
    password: [
      { required: true, message: '密码不能为空', trigger: 'onBlur' },
      {
        min: 6,
        max: 20,
        message: '密码长度在6-20个字符之间',
        trigger: 'onBlur'
      }
    ],
    code: [{ required: true, message: '验证码不能为空', trigger: 'onBlur' }]
  },
  async handleSubmit() {
    if (!formRef.value) return
    const { code, data } = await formRef.value.onSubmit()
    if (code === 200) {
      if (state.agree === false) {
        showToast('请先同意用户注册协议')
        return
      }
      console.log('提交的表单数据：', data)
      const { code } = await userStore.login(data)
      if (code === 200) {
        router.push('/')
      }
    }
  }
})
</script>
