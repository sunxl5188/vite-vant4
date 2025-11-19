/// <reference types="vite/client" />

/* declare interface Window {
  Vue: any
}
 */
declare module 'vue-virtual-scroller'
declare module 'sockjs-client/dist/sockjs.min.js'
declare module 'vue3-qr-reader'
declare module 'vite-plugin-vue-style-px-to-viewport'
declare const window: any
declare const SGMap: any
declare const __APP_VERSION__: string

declare module '*.vue' {
  import { App, defineComponent } from 'vue'
  const component: ReturnType<typeof defineComponent> & {
    install(_app: App): void
  }
  export default component
}
