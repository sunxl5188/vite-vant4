import { defineStore } from 'pinia'
import { post, fetch } from '@/utils/request'
import type { PromiseResult } from '@/utils/request'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      userInfo: null as null | Record<string, any>,
      dictData: {} as Record<string, any>
    }
  },
  actions: {
    // 用户登录
    login(data: Record<string, any>): Promise<PromiseResult> {
      return new Promise((resolve, reject) => {
        post('/home/index/login', data)
          .then((response: any) => {
            const { code, data } = response
            if (code === 200) {
              this.userInfo = data
              setTimeout(async () => {
                await this.setDictData()
                resolve(response)
              }, 0)
            } else {
              reject(response)
            }
          })
          .catch((error: any) => {
            reject(error)
          })
      })
    },
    // 用户登出
    logout() {
      this.userInfo = null
      setTimeout(() => {
        localStorage.removeItem('userStore' + __APP_VERSION__)
        localStorage.removeItem('appStore' + __APP_VERSION__)
      }, 0)
    },
    // 设置字典数据
    async setDictData() {
      return new Promise((resolve, reject) => {
        fetch('/home/index/getSystemDictAll')
          .then(res => {
            if (res.code === 200) {
              this.dictData = res.data
              resolve(true)
            } else resolve(false)
          })
          .catch(err => reject(err))
      })
    }
  },
  getters: {
    getName(): null | Record<string, any> {
      return this.userInfo
    }
  },
  persist: {
    key: 'userStore' + __APP_VERSION__
  }
})
