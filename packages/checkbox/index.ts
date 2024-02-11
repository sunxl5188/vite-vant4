import XlCheckbox from './XlCheckbox.vue'
;(XlCheckbox as any).install = (Vue: any) => {
  Vue.component((XlCheckbox as any).extendOptions.name, XlCheckbox)
}
export default XlCheckbox
