declare module '@/store/userStore' {
  export const useUserStore: import('pinia').StoreDefinition<
    'user',
    {
      name: string
      age: number
    },
    {
      getName(): string
    },
    {
      setName(name: string): void
    }
  >
}
