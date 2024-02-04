import XlPickerGroup from './XlPickerGroup.vue'
;(XlPickerGroup as any).install = (Vue: any) => {
  Vue.component((XlPickerGroup as any).extendOptions.name, XlPickerGroup)
}
export default XlPickerGroup
