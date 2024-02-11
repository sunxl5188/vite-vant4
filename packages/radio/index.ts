import XlRadio from './XlRadio.vue'
;(XlRadio as any).install = (Vue: any) => {
  Vue.component((XlRadio as any).extendOptions.name, XlRadio)
}
export default XlRadio
