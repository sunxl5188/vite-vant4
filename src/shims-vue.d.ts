export {}

declare module 'vue' {
  interface ComponentCustomProperties {
    $dayjs(): any
  }
}
