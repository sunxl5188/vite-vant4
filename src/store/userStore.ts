import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      name: '张三',
      age: 18
    }
  },
  actions: {
    setName(name: string) {
      this.name = name
    }
  },
  getters: {
    getName(): string {
      return this.name + '---'
    }
  },
  persist: true
})
