import XlPicker from './XlPicker.vue'
;(XlPicker as any).install = (Vue: any) => {
  Vue.component((XlPicker as any).extendOptions.name, XlPicker)
}
export default XlPicker
