/// <reference types="vite/client" />

declare interface Window {
  Vue: any
}

//declare const __APP_PREFIX__: string

declare module '*.vue' {
  import { App, defineComponent } from 'vue'
  const component: ReturnType<typeof defineComponent> & {
    install(app: App): void
  }
  export default component
}
