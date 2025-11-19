import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    theme: 'light' as string,
    language: 'zh-CN' as string
  }),
  actions: {
    // 设置主题
    setTheme(theme: 'light' | 'dark') {
      this.theme = theme
    },
    // 设置语言
    setLanguage(lang: string) {
      this.language = lang
    }
  },
  persist: {
    key: 'appStore' + __APP_VERSION__
  }
})
