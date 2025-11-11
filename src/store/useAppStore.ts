import { defineStore } from 'pinia'
import { fetch } from '@/utils/request'

interface AppState {
  theme: 'light' | 'dark'
  language: string
  dictData: Record<string, any>
}

export const useAppStore = defineStore('app', {
  state: (): AppState => ({
    theme: 'light',
    language: 'zh-CN',
    dictData: {}
  }),
  actions: {
    // 设置主题
    setTheme(theme: 'light' | 'dark') {
      this.theme = theme
    },
    // 设置语言
    setLanguage(lang: string) {
      this.language = lang
    },
    // 设置字典数据
    async setDictData() {
      //this.dictData[dictType] = data
      const { code, data } = await fetch('/home/index/getSystemDictAll')
      if (code === 200) {
        this.dictData = data
      }
    }
  },
  persist: true
})
