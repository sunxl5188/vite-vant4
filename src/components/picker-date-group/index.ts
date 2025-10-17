import XlPickerDateGroup from './XlPickerDateGroup.vue'
;(XlPickerDateGroup as any).install = (Vue: any) => {
  Vue.component(
    (XlPickerDateGroup as any).extendOptions.name,
    XlPickerDateGroup
  )
}
export default XlPickerDateGroup
