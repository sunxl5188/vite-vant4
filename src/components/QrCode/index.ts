import QrCode from './index.vue'
;(QrCode as any).install = (Vue: any) => {
  Vue.component((QrCode as any).extendOptions.name, QrCode)
}
export default QrCode
