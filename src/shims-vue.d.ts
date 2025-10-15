import { ComponentCustomProperties } from 'vue'
import type { Dayjs, ConfigType } from 'dayjs'
import type { Big, BigSource } from 'big.js'
//import { I18n } from 'vue-i18n'

declare module 'dayjs/esm/locale/zh-cn.js'

declare module 'vue' {
  interface ComponentCustomProperties {
    $api: any
    $dayjs(T: ConfigType): Dayjs
    $Big(T: BigSource): Big
    //$t: (key: string) => I18n[key] // 扩展 $t 方法类型定义
    //$i18n: I18n // 如果需要访问 i18n 实例本身，也可以扩展此属性类型定义
  }
}

export default ComponentCustomProperties
