import { defineStore } from 'pinia'

type ThemeType = 'light' | 'dark'
type LanguageType = 'zh-CN' | 'en-US'

export const useAppStore = defineStore('app', {
  state: () => ({
    theme: 'light' as ThemeType,
    language: 'zh-CN' as LanguageType
  }),
  actions: {
    // 设置主题
    setTheme(theme: ThemeType) {
      this.theme = theme
    },
    // 设置语言
    setLanguage(lang: LanguageType) {
      this.language = lang
    }
  },
  persist: {
    key: 'appStore' + __APP_VERSION__
  }
})
