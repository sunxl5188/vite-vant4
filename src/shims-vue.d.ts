export {}

/* declare module 'vue' {
  interface ComponentCustomProperties {
    $dayjs(): any
  }
} */

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $dayjs(): any
  }
}
