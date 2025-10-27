/// <reference types="vite/client" />

/* declare interface Window {
  Vue: any
}
 */
declare module 'vue-virtual-scroller'
declare module 'sockjs-client/dist/sockjs.min.js'
declare const window: any

declare module '*.vue' {
  import { App, defineComponent } from 'vue'
  const component: ReturnType<typeof defineComponent> & {
    install(_app: App): void
  }
  export default component
}
