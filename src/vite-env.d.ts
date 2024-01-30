/// <reference types="vite/client" />

declare interface Window {
  Vue: any
}

/* import dayjs from 'dayjs'

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}


//==========================
export {}
declare module 'vue' {
  interface ComponentCustomProperties {
    $dayjs(date?: dayjs.ConfigType): dayjs.Dayjs
  }
}
 */
